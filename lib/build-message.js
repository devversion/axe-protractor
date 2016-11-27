exports.buildMessage = violation => {

  let selectors = violation.nodes.map(node => {
    return node.target.join(' ');
  });

  return selectors.reduce((content, selector) => {
    return content + '- ' + selector + '\n';
  }, '');

};