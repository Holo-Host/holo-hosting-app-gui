// MUI Custom Styling :
import { StyleRulesCallback } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';

const styles: StyleRulesCallback  = (theme: Theme) => ({
smallButton: {
  fontFamily: 'Raleway',
   margin: theme.spacing.unit/4,
   textAlign: 'center',
   background: '#13426a',
   width: '80%',
   border: '1px solid #799ab6',
   textTransform: 'none',
   color: '#c3cdd6',
   boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
   "&:hover": {
     border: '1px solid #799ab6', // #0e094b
     background:'#799ab6', // #210c49
     fontWeight: 'bolder',
     color: '#13426a'
   }
 },
 colButton : {
   fontFamily: 'Raleway',
   fontSize: 10,
   fontWeight: 500,
   margin: theme.spacing.unit,
   textAlign: 'center',
   background: '#c3cdd6',
   border: '1px solid #799ab6',
   color: '#13426a',
   boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
   "&:hover": {
     border: '1px solid #c3cdd6', // #0e094b
     background:'#4b6a7d', // #210c49
     fontWeight: 'bolder',
     color: '#13426a'
   }
 },
 input: {
   display: 'none',
 },
});

export default styles;
