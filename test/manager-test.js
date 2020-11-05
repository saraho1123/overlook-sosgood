import { expect } from 'chai';

import Manager from '../src/Manager';
import sampleUserData from '../src/sample-data/sample-user-data';
import sampleRoomData from '../src/sample-data/sample-room-data';
import sampleBookingData from '../src/sample-data/sample-booking-data';

describe('Manager', () => {
  let manager;

  beforeEach( () => {
    manager = new Manager(sampleUserData, sampleRoomData, sampleBookingData);
  });

  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  });

  it('should be an instance of Manager', () => {
    expect(manager).to.be.an.instanceof(Manager);
  });

  it('should hold userData', () => {
    expect(manager.users[0].id).to.equal(1);
  });

  it('should hold roomData', () => {
    expect(manager.rooms[0].number).to.equal(1);
  });

  it('should allow manager to access all bookings', () => {
    expect(manager.bookings[0].id).to.equal("5fwrgu4i7k55hl6sz");
    expect(manager.bookings[0].userID).to.equal(1);
    expect(manager.bookings[0].date).to.equal("2020/04/22");
    expect(manager.bookings[0].roomNumber).to.equal(1);
  });

  it('should be able to select a user by id', () => {
    manager.selectGuest(5);

    expect(manager.selectedGuest.name).to.equal("Silly Goosefloose");
  });

  it('should be able to find all bookings for selected user', () => {
    manager.getSelectedGuestBookings(1);

    expect(manager.guestBookings).to.deep.equal([  
      {"id":"5fwrgu4i7k55hl6sz","userID":1,"date":"2020/04/22","roomNumber":1,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t9","userID":1,"date":"2020/04/21","roomNumber":5,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t0","userID":1,"date":"2020/04/21","roomNumber":1,"roomServiceCharges":[]}
    ])
  });

  it('should be able to calculate total spent by selected guest on bookings', () => {
    manager.getSelectedGuestBookings(1);
    manager.getGuestTotalSpent(manager.guestBookings);

    expect(manager.guestTotalSpent).to.deep.equal(924.04)
  });

  it('should be able to book a room for selected user', () => {
    expect(manager.bookRoomForGuest(1, '2020/11/14', 4)).to.deep.equal(
      {
        "userID": 1,
        "date": "2020/11/14",
        "roomNumber": 4
    })
  });

  it('should be able to delete a booking for a guest', () => {
    expect(manager.deleteBookingForGuest("5fwrgu4i7k55hl6t9")).to.deep.equal(
      {
        id: "5fwrgu4i7k55hl6t9",
      }
    )
  });

  it('should be able to get total revenue for today', () => {
    expect(manager.getTodaysTotalRevenue('2020/04/21', manager.rooms, manager.bookings))
    .to.deep.equal(565.64)
  })

  it('should calculate percent of rooms occupied for today', () => {
    expect(manager.calculatePercentOccupied('2020/04/21', manager.bookings))
    .to.equal('40%')
  })

})
