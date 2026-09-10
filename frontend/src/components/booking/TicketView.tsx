import type { Booking } from '../../types'

interface Props {
  booking: Booking
}

export default function TicketView({ booking }: Props) {
  return (
    <article className="group overflow-hidden rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-[0_25px_70px_-35px_rgba(15,23,42,0.3)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_-40px_rgba(15,23,42,0.35)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Travel ticket</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
            {booking.destination.name}
          </h3>
          <p className="mt-1 text-sm text-slate-500">{booking.destination.country}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-900/95 px-4 py-2 text-sm font-semibold text-white shadow-sm">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          {booking.status}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Ticket code</p>
          <p className="mt-2 break-all text-lg font-semibold text-slate-900">{booking.ticketCode}</p>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Traveler</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{booking.travelerName}</p>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Visit date</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{new Date(booking.visitDate).toLocaleDateString()}</p>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200/70">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Guests</p>
          <p className="mt-2 text-lg font-semibold text-slate-900">{booking.travelers}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="rounded-3xl bg-slate-950/95 px-5 py-4 text-white shadow-lg shadow-slate-950/10">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Your seat</p>
          <p className="mt-2 text-2xl font-semibold">{booking.seat ?? 'General'}</p>
        </div>
        <div className="rounded-3xl bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200/70 text-right">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total paid</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">${booking.totalPrice}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-5 text-sm text-slate-500">
        <span>Booking ID: {booking.id}</span>
        <span>Issued: {new Date(booking.createdAt).toLocaleDateString()}</span>
      </div>
    </article>
  )
}
