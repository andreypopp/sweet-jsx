macro plusone {
  rule { $x:expr } => { $x + 1 }
}

var React = require('react');
var y = 12;
var x = jsx `<div className={plusone y}>Hello, {plusone {x: name} + 1}</div>`;
