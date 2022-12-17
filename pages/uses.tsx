import Layout from '@/components/layout'

export default function uses() {
  return (
    <Layout
      title="Uses - Dhruv Gursahani"
      description="Here's what tech I'm currently using for coding and everything else"
    >
      <div className="flex flex-col items-start justify-center w-full max-w-3xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Uses
        </h1>
        <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
          Here&apos;s what tech I&apos;m currently using for coding and
          everything else. This list is constantly evolving, be sure to check
          back from time to time
        </p>
        <div className="prose dark:prose-dark w-full">
          <h3 id="hardware">Hardware</h3>
          <ul>
            <li>14&quot; Dell Inspiron 5410 intel (i7 11th gen, 2021)</li>
            <li>Logitech Keyboard Mouse Combo</li>
            <li>Oneplus 9RT</li>
            <li>Oneplus Nord Buds</li>
          </ul>
          <h3 id="p-languages">Programming Languages</h3>
          <h5>Main:</h5>
          <ul>
            <li>Javascript</li>
            <li>Typescript</li>
          </ul>
          <h5>Notions:</h5>
          <ul>
            <li>R</li>
            <li>Python</li>
          </ul>
          <h3 id="frameworks">Frameworks</h3>
          <ul>
            <li>Next.js</li>
            <li>Gatsby</li>
            <li>Node.js</li>
          </ul>
          <h3 id="database">Database / Datastores</h3>
          <ul>
            <li>MongoDB</li>
            <li>Postgres</li>
            <li>MySQL</li>
          </ul>
          <h3 id="extensions">Browser Extensions</h3>
          <ul>
            <li>Bitwarden</li>
            <li>Redux Dev Tools</li>
            <li>Grammarly</li>
            <li>Small PDF</li>
            <li>JSON Viewer Pro</li>
            <li>MetaMask</li>
          </ul>
          <h3 id="vs-extensions">VS Code Extensions</h3>
          <ul>
            <li>Auto Close Tags</li>
            <li>Auto Rename Tag</li>
            <li>Better Comments</li>
            <li>Color Highlight</li>
            <li>Conventional Commits</li>
            <li>GraphQL (Entire Bundle)</li>
            <li>Import Cost</li>
            <li>Prisma</li>
            <li>SynthWave&apos;84</li>
            <li>TailwindCSS Intellisense</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
