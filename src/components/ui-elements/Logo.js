import { Bars3Icon, BellIcon, FingerPrintIcon, XMarkIcon } from '@heroicons/react/24/outline'

function Logo({logo}) {
  return (
    <div className="flex-shrink-0 p-2">
        <img className="h-30 w-40 rounded-full bg-white" src={logo}/>
    </div>
  )
}

export {Logo}
