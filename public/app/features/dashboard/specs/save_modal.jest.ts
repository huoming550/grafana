import { SaveDashboardModalCtrl } from '../save_modal';

const setup = (timeChanged, variableValuesChanged, cb) => {
  const dash = {
    hasTimeChanged: jest.fn().mockReturnValue(timeChanged),
    hasVariableValuesChanged: jest.fn().mockReturnValue(variableValuesChanged),
    resetOriginalTime: jest.fn(),
    resetOriginalVariables: jest.fn(),
    getSaveModelClone: jest.fn().mockReturnValue({}),
  };
  const dashboardSrvMock = {
    getCurrent: jest.fn().mockReturnValue(dash),
    save: jest.fn().mockReturnValue(Promise.resolve()),
  };
  const ctrl = new SaveDashboardModalCtrl(dashboardSrvMock);
  ctrl.saveForm = {
    $valid: true,
  };
  ctrl.dismiss = () => Promise.resolve();
  cb(dash, ctrl, dashboardSrvMock);
};

describe('SaveDashboardModal', () => {
  describe('Given time and template variable values have not changed', () => {
    setup(false, false, (dash, ctrl: SaveDashboardModalCtrl) => {
      it('When creating ctrl should set time and template variable values changed', () => {
        expect(ctrl.timeChange).toBeFalsy();
        expect(ctrl.variableValueChange).toBeFalsy();
      });
    });
  });

  describe('Given time and template variable values have changed', () => {
    setup(true, true, (dash, ctrl: SaveDashboardModalCtrl) => {
      it('When creating ctrl should set time and template variable values changed', () => {
        expect(ctrl.timeChange).toBeTruthy();
        expect(ctrl.variableValueChange).toBeTruthy();
      });

      it('When save time and variable value changes disabled and saving should reset original time and template variable values', async () => {
        ctrl.saveTimerange = false;
        ctrl.saveVariables = false;
        await ctrl.save();
        expect(dash.resetOriginalTime).toHaveBeenCalledTimes(0);
        expect(dash.resetOriginalVariables).toHaveBeenCalledTimes(0);
      });

      it('When save time and variable value changes enabled and saving should reset original time and template variable values', async () => {
        ctrl.saveTimerange = true;
        ctrl.saveVariables = true;
        await ctrl.save();
        expect(dash.resetOriginalTime).toHaveBeenCalledTimes(1);
        expect(dash.resetOriginalVariables).toHaveBeenCalledTimes(1);
      });
    });
  });

  // describe('save modal checkboxes', () => {
  //   it('should show checkboxes', () => {
  //     let fakeDashboardSrv = {
  //       dash: {
  //         templating: {
  //           list: [
  //             {
  //               current: {
  //                 selected: true,
  //                 tags: Array(0),
  //                 text: 'server_001',
  //                 value: 'server_001',
  //               },
  //               name: 'Server',
  //             },
  //           ],
  //         },
  //         originalTemplating: [
  //           {
  //             current: {
  //               selected: true,
  //               text: 'server_002',
  //               value: 'server_002',
  //             },
  //             name: 'Server',
  //           },
  //         ],
  //         time: {
  //           from: 'now-3h',
  //           to: 'now',
  //         },
  //         originalTime: {
  //           from: 'now-6h',
  //           to: 'now',
  //         },
  //       },
  //     };
  //     let modal = new SaveDashboardModalCtrl(fakeDashboardSrv);

  //     expect(modal.timeChange).toBe(true);
  //     expect(modal.variableValueChange).toBe(true);
  //   });

  //   it('should hide checkboxes', () => {
  //     let fakeDashboardSrv = {
  //       dash: {
  //         templating: {
  //           list: [
  //             {
  //               current: {
  //                 selected: true,
  //                 text: 'server_002',
  //                 value: 'server_002',
  //               },
  //               name: 'Server',
  //             },
  //           ],
  //         },
  //         originalTemplating: [
  //           {
  //             current: {
  //               selected: true,
  //               text: 'server_002',
  //               value: 'server_002',
  //             },
  //             name: 'Server',
  //           },
  //         ],
  //         time: {
  //           from: 'now-3h',
  //           to: 'now',
  //         },
  //         originalTime: {
  //           from: 'now-3h',
  //           to: 'now',
  //         },
  //       },
  //     };
  //     let modal = new SaveDashboardModalCtrl(fakeDashboardSrv);
  //     expect(modal.timeChange).toBe(false);
  //     expect(modal.variableValueChange).toBe(false);
  //   });

  //   it('should hide variable checkboxes', () => {
  //     let fakeDashboardSrv = {
  //       dash: {
  //         templating: {
  //           list: [
  //             {
  //               current: {
  //                 selected: true,
  //                 text: 'server_002',
  //                 value: 'server_002',
  //               },
  //               name: 'Server',
  //             },
  //             {
  //               current: {
  //                 selected: true,
  //                 text: 'web_002',
  //                 value: 'web_002',
  //               },
  //               name: 'Web',
  //             },
  //           ],
  //         },
  //         originalTemplating: [
  //           {
  //             current: {
  //               selected: true,
  //               text: 'server_002',
  //               value: 'server_002',
  //             },
  //             name: 'Server',
  //           },
  //         ],
  //       },
  //     };
  //     let modal = new SaveDashboardModalCtrl(fakeDashboardSrv);
  //     expect(modal.variableValueChange).toBe(false);
  //   });
  // });
});
