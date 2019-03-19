import * as React from 'react';
// custom stylesheet :
import '../../styles/page-styles/scaffold-styles.css';

const Summary = (props: any) => {
  return(
		<dl>
			{props.form.map(
				(field: any) => {
          const key: any = Object.getOwnPropertyNames(field);
          if (!field[key[0]]) return null;
          return (
						<div key={key[0] + field[key[0]]}>
							<dt>{key[0]}</dt>
							<dd>{field[key[0]]}</dd>
						</div>
          );
        }
			)}
		</dl>
  );
};

export default Summary;
