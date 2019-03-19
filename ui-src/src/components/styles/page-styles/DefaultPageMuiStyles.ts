// MUI Custom Styling :
import { StyleRulesCallback } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';

// MUI Custom Colors:
// import purple from '@material-ui/core/colors/purple';
// import green from '@material-ui/core/colors/green';

// NoTransactionsMessage
// NoTransactionsMessageText

// #057266f2

const styles: StyleRulesCallback  = (theme: Theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap', // comment out ?
    },
    modalRoot: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      minWidth: 300,
      fontWeight: 'bolder'
    },
    datetimeRoot:{
      display:'inline !important',
      minWidth:'48vw'
    },
    grid: {
      width: '60%',
    },
    flex: {
      flex: 1,
    },
    visible: {
      visiblility: 'visible'
    },
    hidden: {
      visiblility: 'hidden',
    },
    display: {
      display: 'contents',
    },
    noDisplay: {
      display: 'none',
    },
    NoTransactionsMessage: {
      // margin: '0 auto',
      // margin: -60,
      padding: 5,
      background: 'rgb(14, 9, 75)',
      width: '35%',
      border: '1px solid rgb(14, 54, 88)',
      borderRadius: 6,
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
    },
    NoTransactionsMessageText:{
      color: 'rgb(121, 154, 182)',// previously was "#0e094b"
      justifyContent:'center',
      fontWeight: 'lighter'
    },
    detailedTransaction:{
      margin: 50,
      width: '97%',
      height: '60%',
      background: '#4b6a7d',
      border: "3px solid #273269",
      borderRadius: 4,
      padding: 50,
      color: '#ffffff'
    },
    nextBtn: {
      position:'relative',
      left:'51.25%',
      bottom:0,
      width: 350,
      color: '#eee',
      fontSize: 20,
      display:'flex',
      background: '#6600ff',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': { // &$focusVisible
        fontSize: 18,
        border: '2px solid #10d6a9',
        background: 'rgba(0, 1, 127, 0.7)'
      }
    },
    extraTopSpace: {
      marginTop: 16,
    },
    appBar: {
      top: 64,
      backgroundColor: '#0e3658',
      zIndex: 2
    },
    appBarFullPageModal:{
      backgroundColor: '#4b6a7d', // alt:  #0e094b 4b6a7d 0e3658
      position: 'relative'
    },
    bottomAppBar: {
      top: '84vh',
      position: 'fixed',
      bottom: 0,
      backgroundColor: '#0e3658',
      zIndex: 2
    },
    headerAvatar: {
      height: 130,
      width: 130,
      background: '#00838d',
    },
    descriptionAvatar: {
      margin: '0 auto !important',
      marginTop: '10px !important',
      height: 130,
      width: 130,
    },
    toolbar: {
      alignItems: 'center',
      justifyContent: 'center',
      margin:'5vh'
    },
    title: {
      flexGrow: 1,
      color: '',
    },
    subtitle: {
      flexGrow: 1,
      color: '#5c7388',
    },
    h3: {
      color: '#0e094b', // 446164
      fontSize: 20,
      fontWeight: 300,
      marginBottom: 5,
      margin:0
    },
    h3extraTopMargin: {
      marginTop: 25,
    },
    h3ExtraBottomMargin: {
      marginBottom: 15,
    },
    h4: {
      color: '#d8dee3',
      fontSize: 18,
      fontWeight: 300,
      marginBottom: 3,
    },
    verticalLine : {
      borderLeft:' 1px solid #0e094b', // #00838d
      height: 'auto'
    },
    horizontalLine : {
      color:'#ced4da', // #00838d
      background: '#ced4da'
    },
    subheaderLink: {
      color: "#0e094b",
      textDecoration: 'none'
    },
    balanceHeader: {
      textAlign: "center",
      color: '#00838d',
      fontWeight: 300,
      fontSize: 28
    },
    mainHeader: {
      // marginTop: 160,
      textAlign: "center",
      color: '#00838d',
      fontWeight: 600,
      fontSize: 65
    },
    transactionTablesContainer: {
      marginTop: 75,
    },
    tableHeader: {
      display: 'inline',
      textAlign: "center",
      color: '#d8dee3', // color : #d8dee3, // #909fb1 // rgba(0, 0, 0, 0.54)
      fontWeight: 400,
      marginBottom: 20,
      fontSize: '2.175rem',
      textShadow: '0px 1px 8px #09144b'
    },
    pageHeader: {
      fontSize: '3.125rem',
    },
    leadingTitle: {
      marginTop: 50,
    },
    profileHeader:{
      margin: 25
    },
    tableContainer: {
      display: 'block',
      boxSizing: 'border-box',
      margin: 20,
      marginTop: 20,
      marginBottom: 5,
      backgroundColor: 'transparent', // #c3cdd6
      border: 3,
      borderRadius: 4,
      zIndex: 2,
      overflow: 'hidden'
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      background: '#4b6a7d',
      // background: "#111a58eb" // 343752eb 111a58eb
      // background: 'linear-gradient(45deg,#47499063 10%, #111a58eb)', // #08125feb ; #030831eb
    },
    appTable : {
      marginTop: 0,
      // height: 100,
      // width: 100
    },
    table : {
      border: 'none',
      color: '#d8dee3',
      fontWeight: 'bolder',
      fontSize: 18
    },
    subtable: {
      border: '1px solid #eee',
      borderRadius: 4,
      background: '#c3cdd6',
      color: '#13426a',
      "&:hover": {
        color: '#c3cdd6',
        background: '#13426a'
      }
    },
    subtableHeader : {
      fontSize: '1.3rem',
      marginTop: 5,
      display: 'inline',
      textAlign: "center",
      color: '#13426a',
      fontWeight: 300,
    },
    jumbotron: {
      width: '80%',
      margin: '0 auto',
      display: 'block',
      boxSizing: 'border-box',
      padding: '1rem',
      marginBottom: '3rem',
      background: '#e9ecef',
      opacity: .9,
      border: '.3rem',
      borderRadius: 4,
      [theme.breakpoints.down('sm')]: {
        padding: '1.2rem'
      }
    },
    jumbotronFluid: {
      display: 'block',
      boxSizing: 'border-box',
      padding: '2rem 0rem',
      marginBottom: '2rem',
      background: '#e9ecef',
      border: '.1rem',
      opacity: .9,
      borderRadius: 3,
      [theme.breakpoints.down('sm')]: {
        padding: '3.5rem'
      }
    },
    reducedJumbotron: {
      minwidth: '30%',
      maxWidth: '60%',
      height: 90,
      diplay: 'block',
      boxSizing: 'border-box',
      background: '#e9ecef',
      padding: '1rem',
      textAlign: 'center',
      borderRadius: 10,
      marginBottom: '1rem',
      border: '1px solid #0e3658'
    },
    jumbotronImg: {
      display: 'block',
      boxSizing: 'border-box',
      marginBottom: '1rem',
      border: '1rem',
      opacity: .9,
      borderRadius: 4,
      backgroundColor: 'transparent',
      [theme.breakpoints.down('sm')]: {
        padding: '1.2rem'
      }
    },
    inputContainer: {
      width: '60%',
    },
    flexContainer : {
      padding: 0,
      paddingTop: 5,
      margin: '0 auto',
      listStyle: 'none',
      display: 'flex',
      justifyContent: 'space-evenly',
      flexFlow: 'row wrap',
      alignItems: 'stretch',
      // height: 200,\
    },
    flexItem: {
      padding: 5,
      textAlign: 'center',
      // border: '3px solid rgba(0,0,0,.2)',
    },
    button: {
      color: '#eee',
      margin: theme.spacing.unit,
      display: 'inline',
      width: 'calc(100vw / 2.85)',
      padding: 10,
      background: '#0e3658', // #05939a, #d8dee3
      border: '1px solid #799ab6', // #446164, #0e094b, #d8dee3
      "&:hover": {
        border: '2px solid #799ab6', // #0e094b
        background:'#13426a',
        text: '#07808b'
      }
    },
    buttonSumTable: {
      color: '#799ab6',
      margin: '0 auto',
      marginLeft:theme.spacing.unit,
      display: 'inline',
      minWidth: '30px !important',
      width: '40px !important',
      height: 40,
      padding: 0,
      background: '#0e3658', // #05939a, #d8dee3
      border: '1px solid #799ab6', // #446164, #0e094b, #d8dee3
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
      "&:hover": {
        border: '2px solid #799ab6', // #0e094b
        background:'#13426a',
      }
    },
    refreshBtn : {
      marginTop: 3,
      marginBottom: 5,
      width: 5,
      borderRadius: 45,
      "&:hover": {
        border: '2px solid #799ab6', // #0e094b
        background:'#13426a',
      }
    },
    moreBtn: {
      marginTop: 2,
      marginBottom: 50,
      width: 5,
      borderRadius: 45,
      "&:hover": {
        marginTop:3,
      }
    },
    svgView : {
      paddingTop: 4,
      "&:hover": {
        transform: 'rotate(30deg)',
      }
    },
    svgMore : {
      paddingTop: 4,
      "&:hover": {
        marginTop: 2,
      }
    },
     expansionPanelHeading: {
       fontSize: theme.typography.pxToRem(15),
       fontWeight: theme.typography.fontWeightRegular,
     },
     expantionPanelWrapper: {
       width: '100%',
     },
    extraPaddingButton: {
      padding: 36,
    },
    overlay: {
      position: 'fixed',
      display: 'none',
      top: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 2,
      cursor: 'pointer'
    },
    overlayTop: {
      position: 'relative',
      top: 0,
      left: 0
    },
    link: {
      color: "#799ab6",
      textDecoration: 'none'
    },
    subnavRoot: {
      margin: '0 auto',
      flexGrow: 1,
      background: '#201e3d',
      // color:  '#057266f2',
      display: 'inline'
    },
    innerBtnText: {
      color: "#799ab6",
    },
    closeBtn: {
      position: 'absolute',
      top: 4,
      right: -16,
      padding: '4px 8px',
      color: '#799ab6',
      fontSize: '1.5rem',
      // border: '1px solid #799ab6',
      // borderRadius: 4 ,
      "&:hover": {
        text: '#3a426d'
      }
    },
    svgCloseIcon:{
      fontSize: 32
    },
    filterFormControl: {
      minWidth: 120,
      color: ' #799ab6',
      // margin: theme.spacing.unit,
      // padding: 4,
    },
    filterTextTitle : {
      color: '#e9ecef', // alts: #799ab6,  #0e3658
      // marginTop: '11px',
      // marginBottom: '3px',
    },
    dialogContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    dialogFilterFormControl: {
      margin: theme.spacing.unit,
      minWidth: 120
    },
    dropdownMenuItem : {
      color: '#bec4dd',
      background: '#0e094b',
      zIndex: 99,
      "&:hover": {
        color: '#0e094b',
        background: '#bec4dd'
      },
      "&:selected": {
        color: '#0e094b',
        background: '#bec4dd'
      }
    },
    datetimeinputdiv : {
      margin: '0 auto',
      padding: 15,
      paddingBottom: 45,
      // border: '1px solid #0e3658', //#e9ecef, #799ab6
      borderRadius: 46,
      width: '52%',
      // minwidth:'32%',
      height: 115, // smallview = 62px
      // display: 'inline-flex',
    },
    dateInput: {
      border: '1px solid #799ab6',
      padding:4,
      borderRadius: 4,
      margin: '10px 3px',
      background: '#e9ecef'
    },
    QrCodeContainer: {
      boxSizing: 'border-box',
      display: 'flex',
      contentAlign: 'center',
      justifyContent: 'center'
    },
    QrCodeImg: {
      margin: 10,
      width: 220,
      height: 220,
    },
    formControl: {
      width: '100%',
      marginLeft: '2%',
      marginRight: '2%',
      color: '#799ab6',
      borderColor: '#799ab6',
      // marginBottom: 25
    },
    formList : {
      width: '100%',
    },
    formInputContainer: {
      width: '85%',
      color: '#799ab6',
      borderColor: '#799ab6',
    },
    cardBodyBackground: {
      position: "relative",
      background: '#00838d',
      border: '1px solid #0e094b',
      zIndex: 2,
      minHeight: 280,
      paddingTop: 40,
      paddingBottom: 40,
      maxWidth: 440,
      margin: "0 auto"
    },
    cardbodyContent : {
      padding: "0.9375rem 20px",
      flex: "1 1 auto",
      color: "#0e094b",
      // WebkitBoxFlex: "1",
      position: "relative"
    },
    profile: {
      margin: "-50px auto 0",
      borderRadius: "50%",
      overflow: "hidden",
      padding: "0",
      boxShadow:
        "0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
      "&$profile": {
        marginTop: 0
      }
    },
    cardText: {
      float: "none",
      display: "inline-block",
      marginRight: 0,
      borderRadius: 3,
      backgroundColor: "#999999",
      padding: 15,
      marginTop: -20
    },
    txBottomLineSpace:{
      marginBottom: 110,
    },
    txWrapper:{
      marginBottom: 30,
    },
    customFormLabel: {
      color:'#1c2b2e',
      borderColor: '#0b1a42',
      '&$customFormFocused': {
        color:'#eee',
      },
    },
    customFormFocused: {},
    customFormUnderline: {
      color: "#1c2b2e",
      borderBottomColor:"#0b1a42",
      '&:after': {
        borderBottomColor: '#0b1a42',
      },
    },
    customFormInput: {
      color: "#1c2b2e",
      borderColor: "#0b1a42",
      '&$customFormFocused': {
        borderColor: '#0b1a42',
      },
    },
    customFormOutlinedInput: {
      color: "#1c2b2e",
      borderColor: "#0b1a42",
      '&$customFormFocused $notchedOutline' : {
        borderColor: '#0b1a42',
      },
    },
    // customUnderline: {
    //   '&:after': {
    //     borderBottom: `2px solid  #0b1a42`, // '#ced4da
    //     left: 0,
    //     bottom: 0,
    //     content: '""',
    //     position: 'absolute',
    //     right: 0,
    //     transform: 'scaleX(0)',
    //     transition: theme.transitions.create('transform', {
    //       duration: theme.transitions.duration.shorter,
    //       easing: theme.transitions.easing.easeOut,
    //     }),
    //     pointerEvents: 'none',
    //   },
    //   '&$focused:after': {
    //     transform: 'scaleX(1)',
    //   },
    //   '&:before': {
    //     borderBottom: `1px solid #0b1a42`, //  #ced4da
    //     left: 0,
    //     bottom: 0,
    //     content: '"\\00a0"',
    //     position: 'absolute',
    //     right: 0,
    //     transition: theme.transitions.create('border-bottom-color', {
    //       duration: theme.transitions.duration.shorter,
    //     }),
    //     pointerEvents: 'none', // Transparent to the hover style.
    //   },
    //   '&:hover:not($disabled):not($focused):not($error):before': {
    //     borderBottom: `2px solid #3f51b5`, //  #ced4da
    //     // Reset on touch devices, it doesn't add specificity
    //     '@media (hover: none)': {
    //       borderBottom: `1px solid #3f51b5`,
    //     },
    //   },
    //   '&$disabled:before': {
    //     borderBottomStyle: 'dotted',
    //   },
    // },
    areaTextBox : {
      marginTop: 55,
    },
    datetimeInput:{
      textAlign:'left',
      display:'inline !important',
      minWidth:'48vw'
    },
    settingsInput: {
       borderRadius: 4,
       position: 'relative',
       backgroundColor: theme.palette.common.white,
       border: '1px solid #ced4da',
       fontSize: 16,
       width: 'auto',
       padding: '10px 12px',
       transition: theme.transitions.create(['border-color', 'box-shadow']),
       // Use the system font instead of the default Roboto font.
       fontFamily: 'Raleway',
       '&:focus': {
         borderRadius: 4,
         borderColor: '#80bdff',
         boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
       },
     },
     settingsFormLabel: {
       fontSize: 18,
     },
     smallButton: {
       fontSize: '0.8125rem',
       lineHeight: '1.125rem',
       minWidth: '3.75rem',
       padding: '0.3125rem 0.875rem',
       border: '1 solid ##003087',
       boxShadow: '0 0 0 0.0625rem #003087 inset',
       background: 'transparent',
       color: '#003087'
     },
     fab: {
       margin: theme.spacing.unit,
     },
     extendedIcon: {
       marginRight: theme.spacing.unit,
     },
     outlineBtn: {
       padding: theme.spacing.unit,
       margin: `${theme.spacing.unit}px 0`,
       marginTop: 25,
       background:'#2e4f6a', // alternative-color : #0e3658
       border: '1px solid #0e3658', // ##e9ecef
       color: '#e9ecef'
     },
     muiSimpleTableRoot: {
       width: '100%',
       overflowX: 'auto',
       background: '#e9ecef',
     },
     txPaperRoot: {
       ...theme.mixins.gutters(),
       margin: '0 auto',
       padding: 0,
       paddingTop: 15,
       paddingBottom : 20,
       width: '85%',
       display:'flex',
       background: '#2e4f6a',
       border: '2px solid #0e3658',
       borderRadius: 4,
       marginBottom: 115
     },
     inputPaper: {
       background: '#e9ecef',
       padding:10,
       margin:5
     },
     muiSimpleTable:{
       margin: '0 auto',
       justifyContent: 'center',
       minWidth: '80%'
     },
     tableCell: {
       fontSize: '.7rem',
       textTransform: 'capitalize',
       color: '#0e3658 !important',
       padding: 0,
       minWidth: 20,
       maxWidth: 71,
     },
     modal: {
      marginTop: 33,
    },
    notchedOutline:{},
    PaperFullScreen: {
      background: '#4b6a7d'
    }
  }
);

export default styles;
