chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const sendMessage = (messageObj) => {
      console.log('send', tabs);
      chrome.tabs.sendMessage(tabs[0].id, messageObj);
    };
  
    const catchButton = document.getElementById('catch');
    catchButton.addEventListener('click', () => sendMessage({ action: 'Catch' }));
});