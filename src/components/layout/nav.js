import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, FingerPrintIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { navigation, userNavigation } from 'configs/header-nav-links'
import {ProfileDropdown, NotificationsDropdown} from 'components/ui-elements/ProfileDropdown'
import { Logo} from 'components/ui-elements/Logo'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  logo: require('../../assets/background.png')
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function Header(){
  return (
    <header className="text-black shadow-lg">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl px-3 font-bold">MDRRMO-LIBERTAD</h1>
        </div>
        <div className="flex items-center space-x-4">
        <NotificationsDropdown />
        <ProfileDropdown /> 
        </div>
      </div>
    </header>
  );
};

function Nav() {
  return (
    <Disclosure as="nav" className="contents" >
      {({ open }) => (
        <>
          {/* Top Part of Sidebar */}
          <div className="flex flex-col items-center">
            <Logo logo={require('../../assets/libertad.png')}/>
            <div className="mt-4 flex flex-col items-center">
                <NavLinks />
            </div>
            <div className="-mr-2 flex md:hidden">
              <MobileMenuButton open={open} />
            </div>
          </div>

          {/* Bottom Part of Sidebar */}
          <MobileMenu />
        </>
      )}
    </Disclosure>
  )
}

export { Nav,Header}


function MobileMenu() {
  return (
    <Disclosure.Panel className="md:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigation.map(item => (
          <Disclosure.Button
            key={item.name}
            as={NavLink}
            path={item.path}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium'
              )
            }
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-gray-700 pb-3 pt-4">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <img classname="h-10 w-10 rounded-full" src={user.imageurl} alt="Logo"/>
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">{user.name}</div>
            <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
          </div>
          <button
            type="button"
            className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <span className="absolute -inset-1.5" />
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 space-y-1 px-2">
          {userNavigation.map(item => (
            <Disclosure.Button
              key={item.name}
              as={NavLink}
              path={item.path}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              end={item.path === '/'}
            >
              {item.name}
            </Disclosure.Button>
          ))}
        </div>
      </div>
    </Disclosure.Panel>
  )
}

function NavLinks() {
  return (
    <div className="hidden md:flex">
      <div className="flex flex-col">
        {navigation.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              classNames(
                isActive
                  ? 'bg-gray-900 m-1 text-white'
                  : 'text-gray-300 m-1 hover:bg-gray-700 hover:text-white',
                'rounded-md px-3 p-2 text-sm font-medium'
              )
            }
            end={item.path === '/'}
          >
          {item.icon}
          <span className="m-2">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

function MobileMenuButton(open) {
  return (
    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
      <span className="absolute -inset-0.5" />
      <span className="sr-only">Open main menu</span>
      {open ? (
        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
      )}
    </Disclosure.Button>
  )
}

