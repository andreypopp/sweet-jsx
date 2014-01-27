macro jsx {
  case { _ $body } => {
    var ctx = #{$body}[0].context;
    function _copyCtx(tokens) {
      for (var i = 0, len = tokens.length; i < len; i++) {
        tokens[i].context = ctx;
        if (tokens[i].token.inner) {
          _copyCtx(tokens[i].token.inner);
        }
      }
    }

    var transform = require('react-tools').transform;
    var body = #{ $body }[0].token.value.raw;
    var transformed = transform('/** @jsx React.DOM */' + body).slice(21);
    var tokens = parser.read(transformed);

    tokens.pop(); // EOF
    _copyCtx(tokens);
    return tokens;
  }
}

export jsx;
