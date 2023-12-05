sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.test.project2.controller.createNew", {
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
              },
              onCreateAssetPool:function(){
                var copyBatch = [];
                var createAssetModel = this.getOwnerComponent().getModel();
                var assetForm = this.byId("SF1");
               
                    var requestbody = {};
                    requestbody.AssetClass = oSelIndices[i].getObject().AssetClass;
                    requestbody.ExpLeaseEndDt = oSelIndices[i].getObject().ExpLeaseEndDt;
                    requestbody.NoOfAssets = oSelIndices[i].getObject().NoOfAssets;
                    requestbody.ExpInSrvDate = oSelIndices[i].getObject().ExpInSrvDate;
                    requestbody.EstCapitalDate = oSelIndices[i].getObject().EstCapitalDate;
                    requestbody.DepCostCenter = oSelIndices[i].getObject().DepCostCenter;
                    requestbody.EstCapitalization = oSelIndices[i].getObject().EstCapitalization;
                    requestbody.Location = oSelIndices[i].getObject().Location;
                    requestbody.AssetDescription = oSelIndices[i].getObject().AssetDescription;
                    requestbody.AssetReady = oSelIndices[i].getObject().AssetReady;
                    requestbody.ActInSrvDate = oSelIndices[i].getObject().ActInSrvDate;
                    requestbody.WbsElement = oSelIndices[i].getObject().WbsElement;
                    requestbody.AssetShell = oSelIndices[i].getObject().AssetShell;
                    requestbody.Equipment = oSelIndices[i].getObject().Equipment;
                    requestbody.Betterment = oSelIndices[i].getObject().Betterment;
                    requestbody.BetmntLifeExtn = oSelIndices[i].getObject().BetmntLifeExtn;
                    requestbody.currencycode = oSelIndices[i].getObject().currencycode;
                    requestbody.lastchgdt = oSelIndices[i].getObject().lastchgdt;

                    

                
                var params = {};
                
                params.success = function () { };
                params.error = this.onErrorCall;
                
                  createAssetModel.create("/ZP_PF_BRK_ASSETCLS", requestbody, params);

                

              }


        });
    });
