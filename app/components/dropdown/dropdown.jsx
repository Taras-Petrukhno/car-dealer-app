import { useState } from 'react';
import classes from './dropdown.module.scss';

export default function Dropdown({ title, content, contentProp, keyProp, setFunc, setProp }) {
  const [option, setOption] = useState(title);

  function handler(contentItem) {
    setOption(contentItem[contentProp]);

    setFunc((prev) => ({
      ...prev,
      [setProp]: contentItem[setProp],
    }));
  }

  return (
    <div className={classes.dropdown}>
      <span className="flex min-w-64 justify-center border-2">{option}</span>
      <ul className={classes['dropdown-content']}>
        {content.map((contentItem) => (
          <li key={contentItem[keyProp]} onClick={() => handler(contentItem)}>
            {contentItem[contentProp]}
          </li>
        ))}
      </ul>
    </div>
  );
}
