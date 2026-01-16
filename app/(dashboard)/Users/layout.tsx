

export default function layout({children,Friends, NotFriends}) {

  return (
    <div className="flex w-full   border h-screen max-h-screen">
        {Friends}
        {NotFriends}

      
    </div>
  )
}
