const { getReadmeHtml } = require('../../../app/service/readme-service');

test('getStatus should contain HTML elements', () => {
    const html = getReadmeHtml();

    expect(html).toContain('Express.js Backend App');
    expect(html).toContain('<h1');
    expect(html).toContain('<p>');
    expect(html).toContain('<code>');
});