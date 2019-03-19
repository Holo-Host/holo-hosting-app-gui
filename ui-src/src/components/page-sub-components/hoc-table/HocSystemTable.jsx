import React, { Component } from "react";
import PropTypes from "prop-types";
import set from "lodash.set";
import get from "lodash.get";

/*
  This file is s the AvancedExpandTableHOC for ReactTable

  HOC which allows any Cell in the row to toggle the row's
  SubComponent. Also allows the SubComponent to toggle itself.

  Expand functions available to any SubComponent or Column Cell:
    toggleRowSubComponent
    showRowSubComponent
    hideRowSubComponent

  Each Column Renderer (E.g. Cell ) gets the expand functions in its props
  Each SubComponent gets the expand functions in its props

  Expand functions takes the `rowInfo` given to each
  Column Renderer and SubComponent already by ReactTable.
*/

export const subComponentWithToggle = (SubComponent, expandFuncs) => props => (
  <SubComponent {...props} {...expandFuncs} />
);

// each cell in the column gets passed the function to toggle a sub component
export const columnsWithToggle = (columns, expandFuncs) =>
  columns.map(column => {
    if (column.columns) {
      return {
        ...column,
        columns: columnsWithToggle(column.columns, expandFuncs)
      };
    } else {
      return {
        ...column,
        getProps() {
          return {
            ...expandFuncs
          };
        }
      };
    }
  });

export const advancedExpandTableHOC = TableComponent =>
  class AdvancedExpandTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
        expanded: {},
        selected: {},
      };
      this.toggleRowSubComponent = this.toggleRowSubComponent.bind(this);
      this.showRowSubComponent = this.showRowSubComponent.bind(this);
      this.hideRowSubComponent = this.hideRowSubComponent.bind(this);
      this.getTdProps = this.getTdProps.bind(this);
      this.fireOnExpandedChange = this.fireOnExpandedChange.bind(this);
      this.expandFuncs = {
        toggleRowSubComponent: this.toggleRowSubComponent,
        showRowSubComponent: this.showRowSubComponent,
        hideRowSubComponent: this.hideRowSubComponent
      };
    }

    // after initial render if we get new
    // data, columns, page changes, etc.
    // we reset expanded state.
    componentWillReceiveProps() {
      this.setState({
        expanded: {}
      });
    }

    static propTypes = {
      columns: PropTypes.array.isRequired,
      SubComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
        .isRequired,
      onExpandedChange: PropTypes.func
    };

    static defaultProps = {
      onExpandedChange: null
    };

    static DisplayName = "AdvancedExpandTable";

    // since we pass the expand functions to each Cell,
    // we need to filter it out from being passed as an
    // actual DOM attribute. See getProps in columnsWithToggle above.
    static TdComponent({
      toggleRowSubComponent,
      showRowSubComponent,
      hideRowSubComponent,
      ...rest
    }) {
      return <TableComponent.defaultProps.TdComponent {...rest} />;
    }

    fireOnExpandedChange(rowInfo, e) {
      // fire callback once state has changed.
      if (this.props.onExpandedChange) {
        this.props.onExpandedChange(rowInfo, e);
      }
    }

    resolveNewTableState(rowInfoOrNestingPath, e, expandType) {
      // derive nestingPath if only rowInfo is passed
      let nestingPath = rowInfoOrNestingPath;

      if (rowInfoOrNestingPath.nestingPath) {
        nestingPath = rowInfoOrNestingPath.nestingPath;
      }

      this.setState(
        prevState => {
          const isExpanded = get(prevState.expanded, nestingPath);
          // since we do not support nested rows, a shallow clone is okay.
          const newExpanded = { ...prevState.expanded };

          switch (expandType) {
            case "show":
              set(newExpanded, nestingPath, {});
              break;
            case "hide":
              set(newExpanded, nestingPath, false);
              break;
            default:
              // toggle
              set(newExpanded, nestingPath, isExpanded ? false : {});
          }
          return {
            ...prevState,
            expanded: newExpanded
          };
        },
        () => this.fireOnExpandedChange(rowInfoOrNestingPath, e)
      );
    }

    toggleRowSubComponent(rowInfo, e) {
      this.resolveNewTableState(rowInfo, e);
    }

    showRowSubComponent(rowInfo, e) {
      this.resolveNewTableState(rowInfo, e, "show");
    }

    hideRowSubComponent(rowInfo, e) {
      this.resolveNewTableState(rowInfo, e, "hide");
    }

    getTdProps(tableState, rowInfo, column) {
      const { expander } = column;

      if (!expander) {
        // no overrides
        return {};
      }

      return {
        // only override onClick for column Td
        onClick: e => {
          this.toggleRowSubComponent(rowInfo, e);
        }
      };
    }

// handle toggle detail modal
    handleClick = (rowInfo) => {
      // pass the info needed for the detial modal here.. and triger the TX Detail Modal
    }

// TODO: Correct the color toggle... doesn't reset to odd color....
    getTrProps=(state, rowInfo) => {
      if (rowInfo && rowInfo.row && rowInfo !== undefined) {
        // console.log("THIS IS YOUR ROW INFO ... inside the the HocSystemTable addon...", rowInfo);
        return {
          onClick: (e) => {
            this.handleClick(rowInfo.index);
          },
          onMouseOver: (e) => {
            this.setState({
              selected: rowInfo.index
            })
          },
          style: {
            overflowX: scroll,
            fontSize: '.7525rem',
            background: rowInfo.index === this.state.selected ? '#13426a' : rowInfo.row.rowNumberType === 'odd' ? '#63779082' : '#e9ecef',
            color: rowInfo.index === this.state.selected ? '#d8dee3' : '#0e3658'
          }
        }
      }
      else {
        return {}
      }
    }

    getWrappedInstance() {
      if (!this.wrappedInstance)
        // console.warn("AdvancedExpandTable - No wrapped instance");
      if (this.wrappedInstance.getWrappedInstance)
        return this.wrappedInstance.getWrappedInstance();
      else return this.wrappedInstance;
    }

    render() {
      const { columns, SubComponent, onExpandedChange, ...rest } = this.props;

      const wrappedColumns = columnsWithToggle(columns, this.expandFuncs);
      const WrappedSubComponent = subComponentWithToggle(
        SubComponent,
        this.expandFuncs
      );

      return (
        <TableComponent
          {...rest}
          columns={wrappedColumns}
          expanded={this.state.expanded}
          getTdProps={this.getTdProps}
          getTrProps={this.getTrProps}
          SubComponent={WrappedSubComponent}
          TdComponent={AdvancedExpandTable.TdComponent}
        />
      );
    }
  };
