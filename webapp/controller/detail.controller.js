sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.test.project2.controller.detail", {
            onInit: function () {
              //  const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //oRouter.getRoute("detail").attachMatched(this._onRouteMatched, this);
            },
            _onRouteMatched: function (oEvent) {
                const iProductId = oEvent.getParameter("arguments").AssetClass;
                const oView = this.getView();
                oView.bindElement({
                  path: "/ZP_PF_BRK_ASSETCLSType(" + AssetClass + ")",
                  events: {
                    dataRequested: function () {
                      oView.setBusy(true);
                    },
                    dataReceived: function () {
                      oView.setBusy(false);
                    }
                  }
                });
              }


        });
    });
