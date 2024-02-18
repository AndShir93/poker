import {PlanningPoker, User, UpdateUserParams, DEFAULT_USER} from './planningPoker';
import { USER_1, USER_2 } from './planningPoker.fixtures';


describe('Planning poker', () => {
  describe('Изменение данных пользователя', () => {
    describe('В классе одна комната', () => {
      it('В комнате один пользователь', () => {
        const planningPoker = new PlanningPoker();
        const updatedUser: User = {
          ...USER_1,
          name: 'Alex',
        };

        planningPoker.rooms = {
          'fdasd': [ USER_1 ],
        };

        planningPoker.updateUser(
          {
            id: updatedUser.id,
            name: updatedUser.name,
          },
          'fdasd',
        );

        expect(planningPoker.rooms).toEqual({
          'fdasd': [ updatedUser ],
        });
      });

      it('В комнате несколько пользователей', () => {
        const planningPoker = new PlanningPoker();
        const updatedUser = {
          ...USER_1,
          name: 'Alex',
        };

        planningPoker.rooms = {
          'fdasd': [ USER_1, USER_2 ],
        };

        planningPoker.updateUser(
          {
            id: updatedUser.id,
            name: updatedUser.name,
          },
          'fdasd',
        );

        expect(planningPoker.rooms).toEqual({
          'fdasd': [ updatedUser, USER_2 ],
        });
      });
    });

    describe('В классе несколько комнат', () => {
      it('В комнате один пользователь', () => {
        const planningPoker = new PlanningPoker();
        const updatedUser: User = {
          ...USER_1,
          name: 'Alex',
        };

        planningPoker.rooms = {
          'fdasd': [ USER_1 ],
          'dfasd': [],
        };

        planningPoker.updateUser(
          {
            id: updatedUser.id,
            name: updatedUser.name,
          },
          'fdasd',
        );

        expect(planningPoker.rooms).toEqual({
          'fdasd': [ updatedUser ],
          'dfasd': [],
        });
      });

      it('В комнате несколько пользователей', () => {
        const planningPoker = new PlanningPoker();
        const updatedUser = {
          ...USER_1,
          name: 'Alex',
        };

        planningPoker.rooms = {
          'fdasd': [ USER_1, USER_2 ],
          'ddtw': [],
        };

        planningPoker.updateUser(
          {
            id: updatedUser.id,
            name: updatedUser.name,
          },
          'fdasd',
        );

        expect(planningPoker.rooms).toEqual({
          'fdasd': [ updatedUser, USER_2 ],
          'ddtw': [],
        });
      });
    });
  });

  describe('Удаление пользователя', () => {
    describe('В классе одна комната', () => {
      it('В комнате один пользователь', () => {
        const planningPoker = new PlanningPoker();
        const removedUser: User = {
          ...USER_1,
          name: 'Alex',
        };

        planningPoker.rooms = {
          'fdasd': [ USER_1 ],
        };

        planningPoker.removeUser(
          removedUser.id,
          'fdasd',
        );

        expect(planningPoker.rooms).toEqual({});
      });

      it('В комнате несколько пользователей', () => {
        const planningPoker = new PlanningPoker();
        const removedUser = {
          ...USER_1,
          name: 'Alex',
        };

        planningPoker.rooms = {
          'fdasd': [ USER_1, USER_2 ],
        };

        planningPoker.removeUser(
          removedUser.id,
          'fdasd',
        );

        expect(planningPoker.rooms).toEqual({
          'fdasd': [ USER_2 ],
        });
      });
    });

    describe('В классе несколько комнат', () => {
      it('В комнате один пользователь', () => {
        const planningPoker = new PlanningPoker();
        const removedUser: User = {
          ...USER_1,
          name: 'Alex',
        };

        planningPoker.rooms = {
          'fdasd': [ USER_1 ],
          'dfasd': [],
        };

        planningPoker.removeUser(
          removedUser.id,
          'fdasd',
        );

        expect(planningPoker.rooms).toEqual({
          'dfasd': [],
        });
      });

      it('В комнате несколько пользователей', () => {
        const planningPoker = new PlanningPoker();
        const removedUser = {
          ...USER_1,
          name: 'Alex',
        };

        planningPoker.rooms = {
          'fdasd': [ USER_1, USER_2 ],
          'ddtw': [],
        };

        planningPoker.removeUser(
          removedUser.id,
          'fdasd',
        );

        expect(planningPoker.rooms).toEqual({
          'fdasd': [ USER_2 ],
          'ddtw': [],
        });
      });
    });
  });

  describe('Добавление нового пользователя', () => {
    describe('В классе одна комната', () => {
      it('В комнате нет пользователей', () => {
        const planningPoker = new PlanningPoker();
        const addedUserParams = {
          id: USER_2.id,
          name: USER_2.name,
        };

        planningPoker.addUser(addedUserParams, 'fdasd');

        expect(planningPoker.rooms).toEqual({
          'fdasd': [
            {
              ...DEFAULT_USER,
              ...addedUserParams,
              isAdmin: true,
            },
          ],
        });
      });

      it('В комнате один пользователь', () => {
        const planningPoker = new PlanningPoker();
        const addedUserParams: UpdateUserParams = {
          id: USER_2.id,
          name: USER_2.name,
        };

        planningPoker.rooms = {
          'fdasd': [ USER_1 ],
        };

        planningPoker.addUser(addedUserParams, 'fdasd');

        expect(planningPoker.rooms).toEqual({
          'fdasd': [
            USER_1,
            {
              ...DEFAULT_USER,
              ...addedUserParams,
            },
          ],
        });
      });
    });

    describe('В классе несколько комнат', () => {
      it('В комнате нет пользователей', () => {
        const planningPoker = new PlanningPoker();
        const addedUserParams = {
          id: USER_2.id,
          name: USER_2.name,
        };

        planningPoker.rooms = {
          'dfasdf': [ USER_1 ],
        };

        planningPoker.addUser(addedUserParams, 'fdasd');

        expect(planningPoker.rooms).toEqual({
          'dfasdf': [ USER_1 ],
          'fdasd': [
            {
              ...DEFAULT_USER,
              ...addedUserParams,
              isAdmin: true,
            },
          ],
        });
      });

      it('В комнате один пользователь', () => {
        const planningPoker = new PlanningPoker();
        const addedUserParams: UpdateUserParams = {
          id: USER_2.id,
          name: USER_2.name,
        };

        planningPoker.rooms = {
          'dfasdf': [ USER_1 ],
          'fdasd': [ USER_1 ],
        };

        planningPoker.addUser(addedUserParams, 'fdasd');

        expect(planningPoker.rooms).toEqual({
          'dfasdf': [ USER_1 ],
          'fdasd': [
            USER_1,
            {
              ...DEFAULT_USER,
              ...addedUserParams,
            },
          ],
        });
      });
    });

    describe('Переподключение пользователя', () => {
      describe('В классе одна комната', () => {
        it('В комнате один человек', () => {
          const planningPoker = new PlanningPoker();
          const roomId = 'ffff';

          planningPoker.rooms = {
            [roomId]: [ USER_1 ],
          };

          planningPoker.addUser(
            {
              id: USER_1.id,
            },
            roomId,
          );

          expect(planningPoker.rooms).toEqual({
            [roomId]: [ USER_1 ],
          });
        });

        it('В комнате несколько человек', () => {
          const planningPoker = new PlanningPoker();
          const roomId = 'ffff';

          planningPoker.rooms = {
            [roomId]: [ USER_1, USER_2 ],
          };

          planningPoker.addUser(
            {
              id: USER_1.id,
            },
            roomId,
          );

          expect(planningPoker.rooms).toEqual({
            [roomId]: [ USER_1, USER_2 ],
          });
        });
      });

      describe('В классе несколько комнат', () => {
        it('В комнате один человек', () => {
          const planningPoker = new PlanningPoker();
          const roomId = 'ffff';

          planningPoker.rooms = {
            [roomId]: [ USER_1 ],
            'dddd': [ USER_2 ],
          };

          planningPoker.addUser(
            {
              id: USER_1.id,
            },
            roomId,
          );

          expect(planningPoker.rooms).toEqual({
            [roomId]: [ USER_1 ],
            'dddd': [ USER_2 ],
          });
        });

        it('В комнате несколько человек', () => {
          const planningPoker = new PlanningPoker();
          const roomId = 'ffff';

          planningPoker.rooms = {
            [roomId]: [ USER_1, USER_2 ],
            'dddd': [ USER_2 ],
          };

          planningPoker.addUser(
            {
              id: USER_1.id,
            },
            roomId,
          );

          expect(planningPoker.rooms).toEqual({
            [roomId]: [ USER_1, USER_2 ],
            'dddd': [ USER_2 ],
          });
        });
      });
    });
  });
});
