

export default function layout({children,Friends, NotFriends}) {

  return (
    <div className="grid grid-cols-2  w-[calc(100%-var(--sidebar-width))] fixed  border h-screen max-h-screen">
        {Friends}
        {NotFriends}

      
    </div>
  )
}
