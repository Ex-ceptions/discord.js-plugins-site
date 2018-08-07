const IDENTIFIER_REGEX = require('./identifierRegex');

function tokenize(s, parsers, deftok) {
  var m, r, t, tokens = [];
  while (s) {
    t = null;
    m = s.length;
    for (var key in parsers) {
      r = parsers[key].exec(s);
      // Try to choose the best match if there are several
      // where "best" is the closest to the current starting point
      if (r && (r.index < m)) {
        t = {
          token: r[0],
          type: key,
          matches: r.slice(1),
        };
        m = r.index;
      }
    }
    if (m) {
      // There is text between last token and currently
      // matched token - push that out as default or "unknown"
      tokens.push({
        token: s.substr(0, m),
        type: deftok || 'unknown',
      });
    }
    if (t) {
      // Push current token onto sequence
      tokens.push(t);
    }
    s = s.substr(m + (t ? t.token.length : 0));
  }
  return tokens;
}
module.exports = str => tokenize(str, {
  IDENTIFIER: IDENTIFIER_REGEX,
}, 'NOT_IDENTIFIER');
