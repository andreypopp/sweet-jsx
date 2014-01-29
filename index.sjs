macro jsx {
  case { _ $body } => {

    var ctx = #{$body}[0].context;

    function _copyCtx(tokens, ctx) {
      for (var i = 0, len = tokens.length; i < len; i++) {
        tokens[i].context = ctx;
        if (tokens[i].token.inner) {
          _copyCtx(tokens[i].token.inner, ctx);
        }
      }
    }

    function splitParts(str) {
      var current = '';
      var parts = [];
      var deep = 0;

      for (var i = 0, len = str.length; i < len; i++) {
        if (str[i] === '{') {
          deep += 1;
          if (deep === 1) {
            parts.push(current);
            current = '';
          } else {
            current += str[i];
          }
        } else if (str[i] === '}') {
          deep -= 1;
          if (deep === 0) {
            parts.push({code: current});
            current = '';
          } else {
            current += str[i];
          }
        } else {
          current += str[i];
        }
      }

      parts.push(current);
      current = '';

      return parts;
    }

    function annotateParts(parts) {
      var id = 0;
      return parts.map(function(part) {
        if (part.code) {
          part = {code: part.code, id: '__sweet_jsx_id__' + (id++)};
        }
        return part;
      });
    }

    function buildMapping(parts) {
      var mapping = {};
      parts.forEach(function(part) {
        if (part.id && part.code) {
          mapping[part.id] = part.code;
        }
      });
      return mapping;
    }

    function joinParts(parts, mapping) {
      return parts.map(function(part) {
        return part.id ? '{' + part.id + '}' : part;
      }).join('');
    }

    var transform = require('react-tools').transform;
    var body = #{ $body }[0].token.value.raw;

    var parts = annotateParts(splitParts(body));
    var mapping = buildMapping(parts);
    var src = joinParts(parts);

    src = transform('/** @jsx React.DOM */' + src).slice(21);
    src = src.replace(/__sweet_jsx_id__[0-9]+/g, function(id) {
      return mapping[id]
    })


    var tokens = parser.read(src);

    tokens.pop(); // EOF
    _copyCtx(tokens, ctx);
    return tokens;
  }
}

export jsx;
