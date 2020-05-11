const textEmailTemplate = ({
  title, // compulsory
  greeting,
  firstName,
  contentTop,
  contentBottom,
  contentFooter,
  buttonText,
  link,
}) => {
  let content = '';
  const hello = greeting || 'Hello';
  const heading = `${title.toUpperCase()}`;
  const separator = '-'.repeat(title.length + 3);
  const greetings = firstName ? `${hello}, ${firstName}` : hello;
  const button =
    link && buttonText
      ? `${buttonText} [${link}] \n\n or copy this url and view in a web browser ${link}\n\n`
      : '';
  content += (contentTop && contentTop.replace('<br>', '\n')) || '';
  content += contentBottom ? '\n\n' + contentBottom.replace('<br>', '\n') : '';
  const contentBelowButton = contentFooter
    ? '\n\n' + contentFooter.replace('<br>', '\n')
    : '';

  // Generate the text format
  // Note: The text is formatted as it should appear on the device
  return `
${heading}
${separator}

${greetings}.

${content.replace(/<[^>]+>/g, '')}

${button}

${contentBelowButton.replace(/<[^>]+>/g, '')}

Live Your Best Live,
DUV LIVE Team.`;
};

export default textEmailTemplate;
