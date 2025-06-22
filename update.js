// ██████ Integrations █████████████████████████████████████████████████████████
require('dotenv').config();

const { WakaTime } = require('wakatime'),
  { Octokit } = require('@octokit/core');

void (async function main() {
  const waka = new WakaTime(`${process.env.WAKATIMETOKEN}`),
    wakaData = await waka.stats('last_7_days');

  const output = [
    '```console',
    '$ curl -s https://raw.githubusercontent.com/Watuulo-Richard/Watuulo-Richard/master/hello.sh | sh',
    '',
    '██████╗ ██╗ ██████╗██╗  ██╗███╗   ███╗ ██████╗ ███╗   ██╗██████╗ ',
    '██╔══██╗██║██╔════╝██║  ██║████╗ ████║██╔═══██╗████╗  ██║██╔══██╗',
    '██████╔╝██║██║     ███████║██╔████╔██║██║   ██║██╔██╗ ██║██║  ██║',
    '██╔══██╗██║██║     ██╔══██║██║╚██╔╝██║██║   ██║██║╚██╗██║██║  ██║',
    '██║  ██║██║╚██████╗██║  ██║██║ ╚═╝ ██║╚██████╔╝██║ ╚████║██████╔╝',
    '╚═╝  ╚═╝╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚═════╝',
    '├── From Uganda.',
    '├── Born on 2000.10.10',
    '└── Joined Github on 2024.02.17',
    '',
    `$ waka stats --user Watuulo-Richard --from ${
      new Date(Date.now() - 604800000).toISOString().split('T')[0]
    } --to ${new Date().toISOString().split('T')[0]}`,
    '',
  ];

  let maxLangNameLength = 7;

  wakaData.data.languages.length = 7;

  for (const lang of wakaData.data.languages)
    if (lang && lang.name.length > maxLangNameLength)
      maxLangNameLength = lang.name.length;

  // If we have hour > 10, we need to add 1 to the max length to avoid the hour to be on the same line as the name
  const hourPrefixed = wakaData.data.languages.some((lang) => lang.hours >= 10);
  const minsPrefixed = wakaData.data.languages.some(
    (lang) => lang.minutes >= 10,
  );

  for (const language of wakaData.data.languages) {
    if (!language) continue;

    // ── Skip if language is not used more than 1 minute
    if (language.total_seconds < 60) continue;

    const name = language.name.padStart(maxLangNameLength + 1, ' ');
    const percentage = language.percent
      .toString()
      .padEnd(4, 0)
      .padStart(5, ' ');
    const loadbar = '█'
      .repeat(Math.round(language.percent / 5))
      .padEnd(18, ' ');
    const time = `${(hourPrefixed && language.hours) < 10 ? ' ' : ''}${
      language.hours
    } hr${language.hours > 1 ? 's' : ' '} ${
      minsPrefixed && language.minutes < 10 ? 0 : ''
    }${language.minutes} min${language.minutes > 1 ? 's' : ' '}`;

    output.push(`${name}  │  ${percentage}%  ${loadbar}   ${time}`);
  }

  const lastUpdate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  output.push(
    '~ Total '.padStart(maxLangNameLength + 2, ' ') +
      '─┴─────────────────────────────> ' +
      wakaData.data.human_readable_total,
    '',
    '$ ls Watuulo-Richard',
    '├── README.md',
    '│',
    '├── Languages',
    '│   ├── HTML        CSS         Javascript      TypeScript     NodeJS',
    '│   └── PHP         C           C++             Go',
    '│',
    '├── Frameworks',
    '│   └── NextJs      React       TailwindCSS     Vite',
    '│',
    '├── Tools',
    '│   ├── VSCode      Prisma      Httpie          Docker',
    '│   ├── Git         GitHub      Vercel          Postman',
    '│   └── TLDraw      Figma       Discord',
    '│',
    '└── Databases',
    '    └── MySQL       SQLite      MongoDB         Postgres         NeonDB',
    '```',
    `###### This presentation is [updated](https://github.com/Watuulo-Richard/Watuulo-Richard) automatically every 2 hours, most recently on ${lastUpdate} ( UTC±2 )`,
  );

  // ── Update README.md
  const octokit = new Octokit({
    auth: process.env.GITHUBTOKEN,
  });

  // Fixed: Use Buffer.from instead of new Buffer.from
  const base64 = Buffer.from(output.join('\n')).toString('base64');

  const {
    data: { sha },
  } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'Watuulo-Richard',
    repo: 'Watuulo-Richard',
    path: 'README.md',
  });

  await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'Watuulo-Richard',
    repo: 'Watuulo-Richard',
    path: 'README.md',
    message: 'update README with latest stats',
    content: base64,
    sha: sha,
  });

  console.log('Successfully updated the README.md');
})();
