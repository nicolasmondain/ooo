import { Container } from '@/components/spotlight'
import { getAllTags } from '@/lib/articles'
import avatarImage from '@/images/portrait.jpg'

export default function About() {
  const tags = getAllTags()

  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <img
              src={avatarImage}
              alt=""
              className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I'm a developer. I live in the world, building great software.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
            <p>
              I've loved building things for as long as I can remember. From the early
              days of tinkering with HTML in Notepad to crafting complex web applications
              with modern frameworks, the journey has been incredible.
            </p>
            <p>
              Today, I work with React, TypeScript, and the latest web technologies to
              build fast, accessible, and beautiful user experiences. This blog is where
              I share what I've learned along the way – from practical tutorials to
              thoughts on web development trends and best practices.
            </p>
            <p>
              When I'm not coding, you can find me contributing to open source projects,
              experimenting with new technologies, or writing about software development.
              I believe in building things that are not just functional, but also
              delightful to use.
            </p>
            <p>
              This blog is built with React, Vite, and Tailwind CSS, hosted on GitHub
              Pages – a perfect example of how modern web development can be simple,
              fast, and completely free to host.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul className="space-y-4">
            <li className="flex">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">Topics I write about</span>
            </li>
            {tags.map((tag) => (
              <li key={tag} className="flex">
                <span className="flex-auto text-sm text-zinc-600 dark:text-zinc-400">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
