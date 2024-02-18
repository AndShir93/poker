export interface User {
  id: string;
  name: string;
  time: number;
  isAdmin: boolean;
}

export interface UpdateUserParams extends Omit<Partial<User>, 'id'> {
  id: string;
}

export const DEFAULT_USER: User = {
  id: '',
  name: '',
  time: 0,
  isAdmin: false,
};

export class PlanningPoker {
  rooms: Record<string, User[]>;

  constructor() {
    this.rooms = {};
  }

  updateUser (userParams: UpdateUserParams, roomId: string) {
    const users = this.rooms[roomId];
    const userIndex = users.findIndex(({ id }) => id === userParams.id);
    if (userIndex === -1) return;

    this.rooms[roomId].splice(
      userIndex,
      1,
      {
        ...this.rooms[roomId][userIndex],
        ...userParams,
      },
    );

    this.rooms = {
      ...this.rooms,
      [roomId]: this.rooms[roomId].map((user) => {
        if (user.id !== userParams.id) return user;

        return {
          ...user,
          ...userParams,
        };
      }),
    }
  };

  addUser (user: UpdateUserParams, roomId: string) {
    console.log(this.rooms[roomId]);
    if(!this.rooms[roomId]) {
      this.rooms = {
        ...this.rooms,
        [roomId]: [
          {
            ...DEFAULT_USER,
            ...user,
            isAdmin: true,
          },
        ],
      };

      return;
    }

    const currentUser = this.rooms[roomId].find(({ id }) => id === user.id);

    console.log(user);
    const currentRoom = currentUser
      ? this.rooms[roomId]
      : [
        ...this.rooms[roomId],
        {
          ...DEFAULT_USER,
          ...user,
        },
      ];

    this.rooms = Object.keys(this.rooms).reduce((acc, room) => {
      if (room !== roomId)
        return {
          ...acc,
          [room]: this.rooms[room],
        };

      return {
        ...acc,
        [room]: currentRoom,
      };
    }, {});
  }

  removeUser (userId: string, roomId: string) {
    const changedUsersRoom = this.rooms[roomId].filter(({ id }) => id !== userId);

    this.rooms = Object.keys(this.rooms).reduce((acc, room) => {
      if (room !== roomId)
        return {
          ...acc,
          [room]: this.rooms[room],
        };

      return {
        ...acc,
        ...changedUsersRoom.length !== 0
          ? { [room]: changedUsersRoom }
          : {},
      };
    }, {});
  }
}
