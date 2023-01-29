import { Fragment, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Combobox, Dialog, Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import { atom, useAtom } from 'jotai'
import cn from 'classnames'
import {
  BarChart3,
  BookOpen,
  Code2,
  Edit,
  Fingerprint,
  Folder,
  Home,
  Languages,
  Link,
  Moon,
  Power,
  Sun,
  User
} from 'lucide-react'

export const isOpenAtom = atom(false)
export const isCommandPaletteOpenAtom = atom(get => get(isOpenAtom))

enum Actions {
  Router,
  Language,
  Theme,
  Session
}

export default function CommandPalette() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useAtom(isOpenAtom)
  const [search, setSearch] = useState('')
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const config = useMemo(() => {
    return [
      {
        group: 'Navigation',
        title: 'Home',
        action: Actions.Router,
        args: '/',
        icon: <Home strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
      },
      {
        title: 'About',
        action: Actions.Router,
        args: '/about',
        icon: (
          <Fingerprint
            strokeWidth={1.5}
            className="mr-2 mt-[0.12rem] h-5 w-5"
          />
        )
      },
      {
        title: 'Projects',
        action: Actions.Router,
        args: '/projects',
        icon: <Folder strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
      },
      {
        title: 'Blog',
        action: Actions.Router,
        args: '/blog',
        icon: (
          <BookOpen strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
        )
      },
      {
        title: 'Guestbook',
        action: Actions.Router,
        args: '/guestbook',
        icon: <Edit strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
      },
      {
        title: 'Dashboard',
        action: Actions.Router,
        args: '/dashboard',
        disabled: !session?.user?.isAdmin ?? true,
        icon: (
          <BarChart3 strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
        )
      },
      {
        group: 'Socials',
        title: 'GitHub',
        action: Actions.Router,
        args: 'https://github.com/dhruv-bvpdev',
        icon: <Link strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
      },
      {
        title: 'Source Code',
        action: Actions.Router,
        args: 'https://github.com/dhruv-bvpdev/portfolio',
        icon: <Code2 strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
      },
      {
        title: 'Switch Theme',
        action: Actions.Theme,
        args: '',
        icon:
          theme === 'light' ? (
            <Moon strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
          ) : (
            <Sun strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
          )
      },
      {
        title: 'Login (Google)',
        action: Actions.Session,
        args: 'google',
        disabled: session ? true : false,
        icon: <User strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
      },
      {
        title: 'Login (GitHub)',
        action: Actions.Session,
        args: 'github',
        disabled: session ? true : false,
        icon: <User strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
      },
      {
        title: `Logout (${session?.user?.name})`,
        action: Actions.Session,
        args: '',
        disabled: session ? false : true,
        icon: <Power strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
      }
    ]
  }, [session, theme])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (event.code === 'scape' && isOpen)
      ) {
        event.preventDefault()

        setIsOpen(!isOpen)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, setIsOpen])

  const filteredItems = useMemo(() => {
    return config.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, config])

  function handleChange(value: string) {
    setIsOpen(false)
    setSearch('')

    const action = Number(value[0]) as Actions
    switch (action) {
      case Actions.Router:
        router.push(value.slice(2))
        break
      case Actions.Theme:
        setTheme(theme === 'light' ? 'dark' : 'light')
        break
      case Actions.Session:
        if (value.slice(2) === '') {
          signOut()
        } else {
          signIn(value.slice(2))
        }
        break
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-zinc-900/75" />
        </Transition.Child>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            value=""
            onChange={handleChange}
            className={cn(
              'relative mx-auto max-w-xl overflow-hidden rounded-xl shadow-2xl',
              'divide-y divide-gray-200 bg-gray-50 ring-1 ring-black/5 dark:divide-gray-700 dark:bg-gray-800'
            )}
          >
            <div className="flex items-center px-4">
              <Combobox.Input
                onChange={e => setSearch(e.target.value)}
                className={cn(
                  'h-12 w-full border-0 bg-transparent text-gray-800 dark:text-gray-400',
                  'placeholder-gray-400 focus:ring-0'
                )}
                autoComplete="false"
                placeholder="Search..."
              />
            </div>
            <Combobox.Options static className="max-h-96 overflow-y-auto pb-4">
              {filteredItems.map(page => (
                <div key={page.title}>
                  {page.group && (
                    <div className="m-2 ml-3 text-xs text-gray-500 dark:text-gray-400">
                      {page.group}
                    </div>
                  )}
                  {!page.disabled && (
                    <Combobox.Option value={`${page.action}:${page.args}`}>
                      {({ active }) => (
                        <div
                          className={cn(
                            'cursor-pointer px-4 py-2 sm:border-l-2',
                            active
                              ? 'border-l-primary sm:bg-gray-200 sm:dark:bg-gray-700'
                              : 'border-gray-50 bg-gray-50 dark:border-gray-800 dark:bg-gray-800'
                          )}
                        >
                          <div className="flex flex-row pl-1 text-gray-500 dark:text-gray-400">
                            <div className="flex">
                              {page.icon}
                              {page.title}
                            </div>
                          </div>
                        </div>
                      )}
                    </Combobox.Option>
                  )}
                </div>
              ))}
              {search && filteredItems.length === 0 && (
                <p className="p-4 text-sm text-gray-500">No Results</p>
              )}
            </Combobox.Options>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}
