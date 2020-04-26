import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
// Comentei pois estou já instanciando dentro da classe AppointmentsRepository
// const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = AppointmentsRepository.findByDate(
    parsedDate,
  );

  if (findAppointmentInSameDate) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const appointment = AppointmentsRepository.create(provider, parsedDate);

  return res.json(appointment);
});

// appointmentsRouter.get('/', (req, res) => {
//   return res.status(200).json(appointments);
// });

export default appointmentsRouter;
