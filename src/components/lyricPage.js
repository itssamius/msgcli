import React from 'react';
import CodeBlock from '@bit/eden.markdown-components.markdown-styles.code-block';

export default function page(props){
    return(
    <CodeBlock>
		  {props.text}
	  </CodeBlock>
    )
}