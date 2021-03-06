# sweet-jsx

Use [JSX][jsx] and [Sweet.js][sjs] macros together.

**WARNING**: it can be used only with locally installed Sweet.js compiler or
with [sweetify][sweetify].

This macros fences JSX syntax inside `jsx`-tagged template string and compiles
it down to JS with respect to hygiene. So you can write JSX like that:

    render: function() {
      var x = 42;
      return jsx `<div>The answer is {x}</div>`;
    }

It even allows to use other macros inside interpolations:

    macro plusone {
      rule { $x:expr } => { $x + 1 }
    }

    var dom = jsx `
      <div>{plusone 41}</div>
    `

[jsx]: http://facebook.github.io/react/docs/getting-started.html
[sjs]: http://sweetjs.org
[sweetify]: https://github.com/andreypopp/sweetify
