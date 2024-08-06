export const aboutKevin = [
  {
    className: 'indent-0 text-3xl',
    text: [[`// About Kevin`, 'text-comment']],
  },
  {
    className: 'indent-0',
    text: [
      [`export `, 'text-declaration'],
      [`const `, 'text-keyword'],
      [`AboutKevin = () => {`, 'text-default'],
    ],
  },
  {
    className: 'indent-1',
    text: [
      [`let `, 'text-keyword'],
      [`about = `, 'text-default'],
      [
        '`Passionate, motivated, life learner with experience in web development and data analysis. Seeking interesting and complex problems to solve.`;',
        'text-common',
      ],
    ],
  },
  {
    className: 'indent-1',
    text: [
      [`if `, 'text-keyword'],
      [`(interest === "Web Developer") {`, 'text-default'],
    ],
  },
  {
    className: 'indent-2',
    text: [
      [`about = `, 'text-default'],
      [
        `${`I began learning HTML and CSS in 2017 while working as a Marketing Project Manager out of a desire to build landing pages.`}
           ${'I quickly felt limited and found Javascript as the solution to set me free. In 2020, I decided to pursue web development'}
           ${'and learned React. I have been building projects and continuing my education since.'}`,
        'text-common',
      ],
    ],
  },
  {
    className: 'indent-1',
    text: [
      [`} `, 'text-default'],
      [`else if `, 'text-declaration'],
      [`(interest === "Data Analyst") {`, 'text-default'],
    ],
  },
  {
    className: 'indent-2',
    text: [
      [`about = `, 'text-default'],
      [
        `${`In 2017, while working as a Marketing Project Manager, I often felt limited by not having all the data I needed. `}
           ${'This led me to learn SQL to query the Bonanza database and then Python to analyze and manipulate that data. '}
           ${'I developed a strong interest in data analysis and have since been working on various projects, using my skills'}
           ${'to extract valuable insights from data and continuously advancing my education.'}`,
        'text-common',
      ],
    ],
  },
  {
    className: 'indent-1',
    text: [[`} `, 'text-default']],
  },
  {
    className: 'indent-1',
    text: [
      [`return `, 'text-keyword'],
      [`about;`, 'text-default'],
    ],
  },
  {
    className: 'indent-0',
    text: [[`};`, 'text-default']],
  },
];
