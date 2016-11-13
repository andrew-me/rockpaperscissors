export {
  renderAutoGoButton,
  renderResetButton
};

function renderAutoGoButton(handler) {
  const button = document.createElement('button');
  button.className = 'btn btn--large';
  button.innerHTML = 'Go!';
  button.onclick = handler;

  return button;
}

function renderResetButton(handler) {
  const div = document.createElement('button');
  div.className = 'btn btn--large reset';
  div.innerHTML = 'Reset';
  div.onclick = handler;

  return div;
}
