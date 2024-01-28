var infoPrefix = "🛈 ";
var infoSuffix = " 🛈";
var warningPrefix = "⚠ ";
var warningSuffix = " ⚠";
var errorPrefix = "❌ ";
var errorSuffix = " ❌";

var infoTitleColor = "black";
var infoTitleFont = "sans-serif";
var infoTitleFontWeight = "bold";
var infoBackgroundColor = "";
var infoFontSize = "";

var warningTitleColor = "orange";
var warningTitleFont = "sans-serif";
var warningTitleFontWeight = "bold";
var warningBackgroundColor = "";
var warningFontSize = "";

var errorTitleColor = "red";
var errorTitleFont = "sans-serif";
var errorTitleFontWeight = "bold";
var errorBackgroundColor = "";
var errorFontSize = "";

var confirmationButtonBackgroundColor = "#4CAF50";
var confirmationButtonBorder = "none";
var confirmationButtonColor = "white";
var confirmationButtonPadding = "5px 10px";
var confirmationButtonTextAlign = "center";
var confirmationButtonTextDecoration = "none";
var confirmationButtonDisplay = "inline-block";
var confirmationButtonFontSize = "16px";
var confirmationButtonMargin = "30px 10px 0px 0px";
var confirmationButtonCursor = "pointer";
var confirmationButtonBorderRadius = "4px";

var cancelButtonBackgroundColor = "#ff3333"; // Example color for cancel button
var cancelButtonBorder = "none";
var cancelButtonColor = "white";
var cancelButtonPadding = "5px 10px";
var cancelButtonTextAlign = "center";
var cancelButtonTextDecoration = "none";
var cancelButtonDisplay = "inline-block";
var cancelButtonFontSize = "16px";
var cancelButtonMargin = "30px 0px 00px 0px";
var cancelButtonCursor = "pointer";
var cancelButtonBorderRadius = "4px";

var spaceButtons = "space-between";

// Erstelle das Haupt-Element (.custom-modal)
var customModal = document.createElement("div");
customModal.className = "custom-modal";
customModal.id = "custom-modal";
customModal.style.background = "rgb(210,230,240)";

// Erstelle den Header-Bereich (.modal-header)
var modalHeader = document.createElement("div");
modalHeader.className = "modal-header";

// Erstelle den Titelbereich (.title)
var title = document.createElement("div");
title.className = "title";
title.id = "modal-title";
title.style.margin = "auto";
title.textContent = "(ERROR)";

// Erstelle den Schließen-Button (.close-button)
var closeButton = document.createElement("button");
closeButton.className = "close-button";
closeButton.setAttribute("data-close-button", "");
closeButton.id = "custom-close-button";
closeButton.textContent = "×";
// closeButton.onclick = function () {
//   closeModal(this.closest(".custom-modal"));
// };

// Füge Titel und Schließen-Button zum Header hinzu
modalHeader.appendChild(title);
modalHeader.appendChild(closeButton);

// Erstelle den Body-Bereich (.modal-body)
var modalBody = document.createElement("div");
modalBody.className = "modal-body";
modalBody.id = "modal-content";
modalBody.textContent = "(ERROR)";

// Füge Header und Body zur Haupt-Modal-Box hinzu
customModal.appendChild(modalHeader);
customModal.appendChild(modalBody);

// Füge die Modal-Box und das Overlay zum Anfang des Body-Elements hinzu
document.body.insertBefore(customModal, document.body.firstChild);

var customOverlay = document.createElement("div");
customOverlay.id = "custom-overlay";
document.body.insertBefore(customOverlay, document.body.firstChild);

/////

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  const overlay = document.getElementById("custom-overlay");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

const overlay = document.getElementById("custom-overlay");
const modal_body = document.getElementById("modal-content");
const modal_title = document.getElementById("modal-title");
const modal = document.getElementById("custom-modal");
const closeButtonElement = document.getElementById("custom-close-button");

function messagebox_info(header, detail, buttons, options, allowHTML) {
  overlay.onclick = null;
  closeButtonElement.onclick = null;
  // Display the detail and add an "OK" button
  modal_body.innerHTML =
    (allowHTML ? detail : escapeHTML(detail)) +
    `<br><div style='display: flex; justify-content: ${spaceButtons};'>` +
    (buttons.confirmationButton
      ? `<button id='okButton' style="
      background-color: ${confirmationButtonBackgroundColor};
      border: ${confirmationButtonBorder};
      color: ${confirmationButtonColor};
      padding: ${confirmationButtonPadding};
      text-align: ${confirmationButtonTextAlign};
      text-decoration: ${confirmationButtonTextDecoration};
      display: ${confirmationButtonDisplay};
      font-size: ${confirmationButtonFontSize};
      margin: ${confirmationButtonMargin};
      cursor: ${confirmationButtonCursor};
      border-radius: ${confirmationButtonBorderRadius};
    ">${buttons.confirmationButton}</button>`
      : '<div style="display:None" id=okButton></div>') +
    (buttons.cancelButton
      ? `<button id='cancelButton' style="  background-color: ${cancelButtonBackgroundColor};
      border: ${cancelButtonBorder};
      color: ${cancelButtonColor};
      padding: ${cancelButtonPadding};
      text-align: ${cancelButtonTextAlign};
      text-decoration: ${cancelButtonTextDecoration};
      display: ${cancelButtonDisplay};
      font-size: ${cancelButtonFontSize};
      margin: ${cancelButtonMargin};
      cursor: ${cancelButtonCursor};
      border-radius: ${cancelButtonBorderRadius};">${buttons.cancelButton}</button>`
      : '<div style="display:None" id=cancelButton></div>') +
    "</div>";

  // Set the modal title
  modal_title.innerHTML = `<span style="color:${infoTitleColor};font-weight: ${infoTitleFontWeight};font-size: ${infoFontSize};background-color:${infoBackgroundColor};font-family:${infoTitleFont};">${infoPrefix}${
    allowHTML ? header : escapeHTML(header)
  }${infoSuffix}</span>`;

  overlay.onclick = function () {
    const modals = document.querySelectorAll(".custom-modal.active");
    modals.forEach((modal) => {
      closeModal(modal);
    });
    if (options.cancelCallback) {
      options.cancelCallback(...options.cancelParams);
    }
  };

  closeButtonElement.onclick = function () {
    closeModal(modal);
    if (options.cancelCallback) {
      options.cancelCallback(...options.cancelParams);
    }
  };

  // Attach the onclick event handler for the OK button
  const okButton = document.getElementById("okButton");
  okButton.onclick = function () {
    closeModal(modal);
    if (options.confirmationCallback) {
      options.confirmationCallback(...options.confirmationParams);
    }
  };

  // Attach the onclick event handler for the Cancel button
  const cancelButton = document.getElementById("cancelButton");
  cancelButton.onclick = function () {
    closeModal(modal);
    if (options.cancelCallback) {
      options.cancelCallback(...options.cancelParams);
    }
  };
  // Open the modal
  openModal(modal);
}

function messagebox_warning(header, detail, buttons, options, allowHTML) {
  overlay.onclick = null;
  closeButtonElement.onclick = null;

  // Display the detail and add "OK" and "Cancel" buttons
  modal_body.innerHTML =
    (allowHTML ? detail : escapeHTML(detail)) +
    `<br><div style='display: flex; justify-content: ${spaceButtons};'>` +
    (buttons.confirmationButton
      ? `<button id='okButton' style="
      background-color: ${confirmationButtonBackgroundColor};
      border: ${confirmationButtonBorder};
      color: ${confirmationButtonColor};
      padding: ${confirmationButtonPadding};
      text-align: ${confirmationButtonTextAlign};
      text-decoration: ${confirmationButtonTextDecoration};
      display: ${confirmationButtonDisplay};
      font-size: ${confirmationButtonFontSize};
      margin: ${confirmationButtonMargin};
      cursor: ${confirmationButtonCursor};
      border-radius: ${confirmationButtonBorderRadius};
    ">${buttons.confirmationButton}</button>`
      : '<div style="display:None" id=okButton></div>') +
    (buttons.cancelButton
      ? `<button id='cancelButton' style="  background-color: ${cancelButtonBackgroundColor};
      border: ${cancelButtonBorder};
      color: ${cancelButtonColor};
      padding: ${cancelButtonPadding};
      text-align: ${cancelButtonTextAlign};
      text-decoration: ${cancelButtonTextDecoration};
      display: ${cancelButtonDisplay};
      font-size: ${cancelButtonFontSize};
      margin: ${cancelButtonMargin};
      cursor: ${cancelButtonCursor};
      border-radius: ${cancelButtonBorderRadius};">${buttons.cancelButton}</button>`
      : '<div style="display:None" id=cancelButton></div>') +
    "</div>";

  // Set the modal title
  modal_title.innerHTML = `<span style="color:${warningTitleColor};font-weight: ${warningTitleFontWeight};font-size: ${warningFontSize};background-color:${warningBackgroundColor};font-family:${warningTitleFont};">${warningPrefix}${
    allowHTML ? header : escapeHTML(header)
  }${warningSuffix}</span>`;

  overlay.onclick = function () {
    const modals = document.querySelectorAll(".custom-modal.active");
    modals.forEach((modal) => {
      closeModal(modal);
    });
    if (options.cancelCallback) {
      options.cancelCallback(...options.cancelParams);
    }
  };

  closeButtonElement.onclick = function () {
    closeModal(modal);
    if (options.cancelCallback) {
      options.cancelCallback(...options.cancelParams);
    }
  };

  // Attach the onclick event handler for the OK button
  const okButton = document.getElementById("okButton");
  okButton.onclick = function () {
    closeModal(modal);
    if (options.confirmationCallback) {
      options.confirmationCallback(...options.confirmationParams);
    }
  };

  // Attach the onclick event handler for the Cancel button
  const cancelButton = document.getElementById("cancelButton");
  cancelButton.onclick = function () {
    closeModal(modal);
    if (options.cancelCallback) {
      options.cancelCallback(...options.cancelParams);
    }
  };

  // Open the modal
  openModal(modal);
}

function messagebox_error(header, detail, buttons, options, allowHTML) {
  overlay.onclick = null;
  closeButtonElement.onclick = null;
  // Display the detail and add an "OK" button
  modal_body.innerHTML =
    (allowHTML ? detail : escapeHTML(detail)) +
    `<br><div style='display: flex; justify-content: ${spaceButtons};'>` +
    (buttons.confirmationButton
      ? `<button id='okButton' style="
      background-color: ${confirmationButtonBackgroundColor};
      border: ${confirmationButtonBorder};
      color: ${confirmationButtonColor};
      padding: ${confirmationButtonPadding};
      text-align: ${confirmationButtonTextAlign};
      text-decoration: ${confirmationButtonTextDecoration};
      display: ${confirmationButtonDisplay};
      font-size: ${confirmationButtonFontSize};
      margin: ${confirmationButtonMargin};
      cursor: ${confirmationButtonCursor};
      border-radius: ${confirmationButtonBorderRadius};
    ">${buttons.confirmationButton}</button>`
      : '<div style="display:None" id=okButton></div>') +
    (buttons.cancelButton
      ? `<button id='cancelButton' style="  background-color: ${cancelButtonBackgroundColor};
      border: ${cancelButtonBorder};
      color: ${cancelButtonColor};
      padding: ${cancelButtonPadding};
      text-align: ${cancelButtonTextAlign};
      text-decoration: ${cancelButtonTextDecoration};
      display: ${cancelButtonDisplay};
      font-size: ${cancelButtonFontSize};
      margin: ${cancelButtonMargin};
      cursor: ${cancelButtonCursor};
      border-radius: ${cancelButtonBorderRadius};">${buttons.cancelButton}</button>`
      : '<div style="display:None" id=cancelButton></div>') +
    "</div>";

  // Set the modal title
  modal_title.innerHTML = `<span style="color:${errorTitleColor};font-weight: ${errorTitleFontWeight};font-size: ${errorFontSize};background-color:${errorBackgroundColor};font-family:${errorTitleFont};">${errorPrefix}${
    allowHTML ? header : escapeHTML(header)
  }${errorSuffix}</span>`;

  overlay.onclick = function () {
    const modals = document.querySelectorAll(".custom-modal.active");
    modals.forEach((modal) => {
      closeModal(modal);
    });
    if (options.cancelCallback) {
      options.cancelCallback(...options.cancelParams);
    }
  };

  closeButtonElement.onclick = function () {
    closeModal(modal);
    if (options.cancelCallback) {
      options.cancelCallback(...options.cancelParams);
    }
  };

  // Attach the onclick event handler for the OK button
  const okButton = document.getElementById("okButton");
  okButton.onclick = function () {
    closeModal(modal);
    if (options.confirmationCallback) {
      options.confirmationCallback(...options.confirmationParams);
    }
  };

  // Attach the onclick event handler for the Cancel button
  const cancelButton = document.getElementById("cancelButton");
  cancelButton.onclick = function () {
    closeModal(modal);
    if (options.cancelCallback) {
      options.cancelCallback(...options.cancelParams);
    }
  };

  // Open the modal
  openModal(modal);
}

function editModal(config = {}) {
  title.style.margin =
    config.titleMargin !== undefined ? config.titleMargin : "auto"; // accept empty string, || does not
  infoPrefix = config.infoPrefix !== undefined ? config.infoPrefix : infoPrefix;
  infoSuffix = config.infoSuffix !== undefined ? config.infoSuffix : infoSuffix;
  warningPrefix =
    config.warningPrefix !== undefined ? config.warningPrefix : warningPrefix;
  warningSuffix =
    config.warningSuffix !== undefined ? config.warningSuffix : warningSuffix;
  errorPrefix =
    config.errorPrefix !== undefined ? config.errorPrefix : errorPrefix;
  errorSuffix =
    config.errorSuffix !== undefined ? config.errorSuffix : errorSuffix;

  infoTitleColor = config.infoTitleColor || infoTitleColor;
  infoTitleFont = config.infoTitleFont || infoTitleFont;
  infoTitleFontWeight = config.infoTitleFontWeight || infoTitleFontWeight;
  infoBackgroundColor = config.infoBackgroundColor || infoBackgroundColor;
  infoFontSize = config.infoFontSize || infoFontSize;
  warningTitleColor = config.warningTitleColor || warningTitleColor;
  warningTitleFont = config.warningTitleFont || warningTitleFont;
  warningTitleFontWeight =
    config.warningTitleFontWeight || warningTitleFontWeight;
  warningBackgroundColor =
    config.warningBackgroundColor || warningBackgroundColor;
  warningFontSize = config.warningFontSize || warningFontSize;
  errorTitleColor = config.inferrorTitleColoroTitleColor || errorTitleColor;
  errorTitleFont = config.errorTitleFont || errorTitleFont;
  errorTitleFontWeight = config.errorTitleFontWeight || errorTitleFontWeight;
  errorBackgroundColor = config.errorBackgroundColor || errorBackgroundColor;
  errorFontSize = config.errorFontSize || errorFontSize;

  closeButton.style.background =
    config.closeButtonBackgroundColor || closeButton.style.background;
  closeButton.style.color = config.closeButtonColor || closeButton.style.color;
  closeButton.textContent = config.closeButtonText || closeButton.textContent;

  modalBody.style.fontFamily = config.bodyFont || modalBody.style.fontFamily;
  modalBody.style.fontSize = config.bodyFontSize || modalBody.style.fontSize;
  modalBody.style.fontWeight =
    config.bodyFontWeight || modalBody.style.fontWeight;
  modalBody.style.color = config.bodyColor || modalBody.style.color;
  modalBody.style.background =
    config.bodyBackgroundColor || modalBody.style.backgroundColor;
    console.log(config.bodyBackgroundColor)
    console.log(modalBody.style.backgroundColor)

  customModal.style.background =
    config.backgroundColor || customModal.style.background;

  confirmationButtonBackgroundColor =
    config.confirmationButtonBackgroundColor ||
    confirmationButtonBackgroundColor;
  confirmationButtonBorder =
    config.confirmationButtonBorder || confirmationButtonBorder;
  confirmationButtonColor =
    config.confirmationButtonColor || confirmationButtonColor;
  confirmationButtonPadding =
    config.confirmationButtonPadding || confirmationButtonPadding;
  confirmationButtonTextAlign =
    config.confirmationButtonTextAlign || confirmationButtonTextAlign;
  confirmationButtonTextDecoration =
    config.confirmationButtonTextDecoration || confirmationButtonTextDecoration;
  confirmationButtonDisplay =
    config.confirmationButtonDisplay || confirmationButtonDisplay;
  confirmationButtonFontSize =
    config.confirmationButtonFontSize || confirmationButtonFontSize;
  confirmationButtonMargin =
    config.confirmationButtonMargin || confirmationButtonMargin;
  confirmationButtonCursor =
    config.confirmationButtonCursor || confirmationButtonCursor;
  confirmationButtonBorderRadius =
    config.confirmationButtonBorderRadius || confirmationButtonBorderRadius;

  cancelButtonBackgroundColor =
    config.cancelButtonBackgroundColor || cancelButtonBackgroundColor;
  cancelButtonBorder = config.cancelButtonBorder || cancelButtonBorder;
  cancelButtonColor = config.cancelButtonColor || cancelButtonColor;
  cancelButtonPadding = config.cancelButtonPadding || cancelButtonPadding;
  cancelButtonTextAlign = config.cancelButtonTextAlign || cancelButtonTextAlign;
  cancelButtonTextDecoration =
    config.cancelButtonTextDecoration || cancelButtonTextDecoration;
  cancelButtonDisplay = config.cancelButtonDisplay || cancelButtonDisplay;
  cancelButtonFontSize = config.cancelButtonFontSize || cancelButtonFontSize;
  cancelButtonMargin = config.cancelButtonMargin || cancelButtonMargin;
  cancelButtonCursor = config.cancelButtonCursor || cancelButtonCursor;
  cancelButtonBorderRadius =
    config.cancelButtonBorderRadius || cancelButtonBorderRadius;

  spaceButtons =
    config.spaceButtons !== undefined ? config.spaceButtons : spaceButtons;
}

function escapeHTML(input) {
  return input.replace(/[&<>"']/g, function (match) {
    switch (match) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;"; // Use '&#39;' for apostrophe
      default:
        return match;
    }
  });
}
