import * as React from 'react';
// lcustom stylesheet :
import '../../styles/page-styles/scaffold-styles.css';

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  css_class: any,
  title: string,
  account: string,
  serverResponse: any,
  onChange: () => void
}

export interface StateProps {
// Props that are set by mapStateToProps
}

export interface DispatchProps {
// Props that are set by mapDispatchToProps
}

export type Props = OwnProps & StateProps;

export interface State {
// The components optional internal state
}

class Select extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
  }

  public render () {
    return (
			<fieldset className={this.props.css_class}>
				<label>{this.props.title}</label>
				<i className='fa fa-user fa-fw'/>
				<select onChange={this.props.onChange} value={this.props.account}>
					{this.props.serverResponse.map((option: any) => {
            return (
							<option key={option.id} value={option.id}>
								{option.name}
							</option>
              );
            })}
				</select>
			</fieldset>
    );
  }
}

export default Select;
