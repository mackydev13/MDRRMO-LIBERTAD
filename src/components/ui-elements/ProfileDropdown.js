import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { navigation, userNavigation } from '../../configs/header-nav-links.js'
import { NavLink } from 'react-router-dom'
import { Bars3Icon, BellIcon, FingerPrintIcon, XMarkIcon } from '@heroicons/react/24/outline'


const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  logo: require('../../assets/libertad.png')
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProfileDropdown() {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {userNavigation.map(item => (
            <Menu.Item key={item.name}>
              {active => (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    classNames(
                      isActive ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}


function NotificationsDropdown() {
  return (
    <button
      type="button"
      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>
      <BellIcon className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}




export {ProfileDropdown, NotificationsDropdown}
