const path = require('path');
const EmailTemplate = require('email-templates').EmailTemplate;

module.exports = (templateName, locale, data) => {
  return new Promise((resolve, reject) => {
    const templateDir = path.join(__dirname, '../../../', 'email-templates', `${templateName}-${locale}`);
    const template = new EmailTemplate(templateDir);
    template.render(data, (err, result) => {
      if (err && err.code !== 'ENOENT') return reject(err);
      if (err && err.code === 'ENOENT') console.warn('File not found', templateDir);
      resolve(result);
    });
  });
};
