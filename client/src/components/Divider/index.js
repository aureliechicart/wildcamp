import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

import './divider.scss';

const Divider = () => (
  <div className="tree-divider">
    <FontAwesomeIcon className="tree-one" icon={faTree} pull="right" />
    <FontAwesomeIcon className="tree-two" icon={faTree} pull="right" />
    <FontAwesomeIcon className="tree-three" icon={faTree} pull="right" />
  </div>
);

export default Divider;