import { textColor } from '~/utils/textColor';

const About = () => {
  return (
    <section
      className="mt-4 rounded-lg p-8 flex flex-wrap flex-col gap-8 items-center justify-center font-jetbrains"
      id="about"
    >
      <div className="max-w-[1200px] bg-gray-900 shadow-custom rounded-lg p-8 whitespace-pre-line">
        <p>
          {textColor('export', 'text-declaration')}{' '}
          {textColor('const', 'text-keyword')} AboutKevin = () ={'>'} {'{'}
        </p>
        <div style={{ marginLeft: '1rem' }}>
          <p>
            {textColor('const', 'text-keyword')}{' '}
            {textColor('interest', 'text-common')} = prompt(&quot;Web Developer
            or Data Analyst&quot;);
          </p>
          <br />
          <div style={{ marginLeft: '1rem' }}>
            <span
              style={{ marginLeft: '-1rem !important' }}
              className=".indent-4"
            >
              {textColor('let', 'text-keyword')}
              {' about = '}
              {textColor(
                '`Passionate, motivated, life learner with experience in web development and data analysis. Seeking interesting and complex problems to solve.',
                'text-common'
              )}
              {';'}
            </span>
            <br />
            <br />
            <p>
              {textColor('if', 'text-keyword')} {'('}interest === &quot;Web
              Developer&quot;{')'}
              {'  {'}
            </p>
            <div style={{ marginLeft: '3rem' }}>
              <span
                // style={{ marginLeft: "-1rem !important" }}
                className=".indent-4"
              >
                {'about = '}
                {textColor(
                  `${'`'}I began learning HTML and CSS in 2017 while working as a Marketing Project Manager out of a desire to build landing pages.\n\nI quickly felt limited and found Javascript as the
                  solution to set me free. In 2020, I decided to pursue web development and learned React. I have been building projects and continuing my education since.${'`'}`,
                  'text-common'
                )}
                {';'}
              </span>
            </div>
            <br />
            <p>
              {'} '}
              {textColor('else if', 'text-keyword')} {'('}interest ===
              &quot;Data Analyst&quot;
              {')'}
              {'  {'}
            </p>

            <div style={{ marginLeft: '3rem' }}>
              <span
                // style={{ marginLeft: "-1rem !important" }}
                className=".indent-4"
              >
                {'about = '}
                {textColor(
                  `${'`'}I began learning HTML and CSS in 2017 while working as a Marketing Project Manager out of a desire to build landing pages.\n\nI quickly felt limited and found Javascript as the
                  solution to set me free. In 2020, I decided to pursue web development and learned React. I have been building projects and continuing my education since.${'`'}`,
                  'text-common'
                )}
                {';'}
              </span>
            </div>
            {'}'}
            <br />
            <br />
            <p>{textColor('return', 'text-keyword')} about;</p>

            <div style={{ marginLeft: '-2rem' }}>{'};'}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
