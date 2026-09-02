"use client"
import type { ChatUser } from "../types"

type Props = {
    users: ChatUser[],
    selectedUserId: string | null,
    onSelect: (id: string) => void,
    unreadByUser: Record<string, number>,
    currentUserName: string,
    onLeave: () => void
}

const UserList = ({ users, selectedUserId, onSelect, unreadByUser, currentUserName, onLeave }: Props) => {
    return (
        <aside className='flex w-full flex-col border-r border-slate-200 bg-white sm:w-64'>

            <header className='flex items-center justify-between gap-2 border-b border-slate-200 px-4 py-3'>
                <div className='min-w-0'>
                    <p className='truncate text-sm font-semibold text-slate-900'>{currentUserName}</p>
                    <p className='flex items-center gap-1.5 text-xs text-slate-500'>
                        <span className='size-1.5 rounded-full bg-emerald-500' />
                        You
                    </p>
                </div>

                <button
                    type='button'
                    onClick={onLeave}
                    className='shrink-0 rounded-lg border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900'
                >
                    Leave
                </button>
            </header>

            <p className='px-4 pt-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400'>
                Online — {users.length}
            </p>

            {users.length === 0 ? (
                <div className='px-4 py-6 text-center'>
                    <p className='text-sm text-slate-500'>Nobody else is here yet.</p>
                    <p className='mt-1 text-xs text-slate-400'>
                        Open another tab with a different name.
                    </p>
                </div>
            ) : (
                <ul className='flex-1 overflow-y-auto px-2 pb-2'>
                    {users.map((user) => {
                        const isActive = user.id === selectedUserId;
                        const unread = unreadByUser[user.id] ?? 0;

                        return (
                            <li key={user.id}>
                                <button
                                    type='button'
                                    onClick={() => onSelect(user.id)}
                                    aria-current={isActive ? "true" : undefined}
                                    className={`flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left transition ${isActive
                                        ? 'bg-indigo-50 text-indigo-900'
                                        : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    <span className='relative shrink-0'>
                                        <span className={`flex size-9 items-center justify-center rounded-full text-sm font-bold uppercase ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {user.name.charAt(0)}
                                        </span>
                                        {/* online dot */}
                                        <span className='absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-white bg-emerald-500' />
                                    </span>

                                    <span className='min-w-0 flex-1 truncate text-sm font-medium'>
                                        {user.name}
                                    </span>

                                    {unread > 0 && !isActive && (
                                        <span className='shrink-0 rounded-full bg-indigo-600 px-1.5 py-0.5 text-[11px] font-bold text-white'>
                                            {unread}
                                        </span>
                                    )}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </aside>
    )
}

export default UserList
