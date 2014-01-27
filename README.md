# sweet-jsx

Use [JSX][jsx] and sweet.js macros together.

This macros fences JSX syntax inside `jsx`-tagged template string and compiles
it down to JS with respect to hygiene. So you can write JSX like that:

    render: function() {
      var x = 42;
      return jsx `<div>The answer is {x}</div>`;
    }

[jsx]: http://facebook.github.io/react/docs/getting-started.html
