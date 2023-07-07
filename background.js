chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.clear();

  const questionElement = document.querySelector('#assessment-a11y-title .visually-hidden');
  const question = questionElement?.textContent?.trim() ?? '';

  const codeElement = document.querySelector('.sa-assessment-quiz__title-detail .visually-hidden');
  const code = codeElement ? `\n\`\`\`\n${codeElement.textContent.trim()}\n\`\`\`\n\n` : '';

  const answers = Array.from({ length: 4 }, (_, index) => {
    const box = 'code';
    let answerElement = document.querySelector(`#skill-assessment-quiz-${index} .sa-question-basic-multichoice__multiline ${box}.visually-hidden`);
    if (!answerElement) {
      answerElement = document.querySelector(`#skill-assessment-quiz-${index} .sa-question-basic-multichoice__multiline span.visually-hidden`);
      console.log(answerElement);
      if(!answerElement)
      {
        answerElement = document.querySelector(`#skill-assessment-quiz-${index}`);
        console.log(answerElement);
      }
    }
    return `${index + 1}. ${answerElement?.textContent?.trim() ?? ''}`;
  });

  const result = `請告訴我哪個答案是對的，並直接回答答案，並且用中文解釋\nQ：${question}\n${code}${answers.join('\n')}`;
  console.log(result);

  const el = document.createElement('textarea');
  el.value = result;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
});