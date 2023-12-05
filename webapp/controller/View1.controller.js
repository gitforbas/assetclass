sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/MessageToast",
    "sap/m/Button",
    "sap/m/Label",
    "sap/m/Text",
    "sap/m/library"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, Dialog, MessageToast, Button, Label, Text, mobileLibrary) {
        "use strict";
        // shortcut for sap.m.ButtonType
        var ButtonType = mobileLibrary.ButtonType;

        // shortcut for sap.m.DialogType
        var DialogType = mobileLibrary.DialogType;
        return Controller.extend("com.test.project2.controller.View1", {
            onInit: function () {

            },
            // handleListItemPress() {
            //     const oRouter = this.getOwnerComponent().getRouter();
            //     oRouter.navTo("detail");
            // },
            handleListItemPress: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // var selectedProductId = oEvent.getSource().getBindingContext().getProperty("AssetClass");
                oRouter.navTo("detail", {
                    AssetClass: "abc"
                });
            },

            createNewAsset: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                // var selectedProductId = oEvent.getSource().getBindingContext().getProperty("AssetClass");
                oRouter.navTo("createNew");
            },
            onCopy: function () {
                var gettingInternalTable = this.byId("LineItemsSmartTable").getTable(),
                    gettingItems = gettingInternalTable.getItems(),
                    oSelIndices = gettingInternalTable.getSelectedItems();
                this.onApproveDialogPress(oSelIndices);
                //oSelIndices will have index of the rows
                // for(var i of oSelIndices){
                // console.log(gettingItems[i].getBindingContext().getObject())
                // }

            },
            onConfirmationMessageBoxPress: function (oSelIndices) {
                MessageBox.confirm("Copy" + "" + oSelIndices.length + "" + "Items to create New Records?");
            },
            onApproveDialogPress: function (oSelIndices) {
                if (!this.oApproveDialog) {
                    this.oApproveDialog = new Dialog({
                        type: DialogType.Message,
                        title: "Confirm",
                        content: new Text({ text: "Copy " + "" + oSelIndices.length + "" + " Items to create New Records?" }),
                        beginButton: new Button({
                            type: ButtonType.Emphasized,
                            text: "Submit",
                            press: function () {
                                MessageToast.show("Submit pressed!");
                                this.oApproveDialog.close();
                            }.bind(this)
                        }),
                        endButton: new Button({
                            text: "Cancel",
                            press: function () {
                                this.oApproveDialog.close();
                            }.bind(this)
                        })
                    });
                }

                this.oApproveDialog.open();
            },
            onCreateBatch: function () {
                var copyBatch = [];
                var copyModel = this.getOwnerComponent().getModel();
                var gettingInternalTable = this.byId("LineItemsSmartTable").getTable(),
                    gettingItems = gettingInternalTable.getItems(),
                    oSelIndices = gettingInternalTable.getSelectedItems();
                for (var i; i < oSelIndices.length; i++) {
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

                    copyBatch.push(requestbody);

                }
                var params = {};
                params.groupId = "copyBatch";
                params.success = function () { };
                params.error = this.onErrorCall;
                for (var k; k < copyBatch.length; k++) {
                    copyModel.create("/ZP_PF_BRK_ASSETCLS", copyBatch[k], params);

                }





            },

            onErrorCall: function (oError) {
                if (oError.statusCode === "500" || oError.statusCode === "400" || oError.statusCode === "500" || oError.statusCode === "400") {

                    var errorRes = JSON.parse(oError.responseText);
                    if (!errorRes.error.innererror) {
                        MessageBox.alert(errorRes.error.message.value);
                    }
                    else {
                        if (!errorRes.error.innererror.message) {
                            MessageBox.alert(errorRes.error.innererror.toString());
                        }
                        else {
                            MessageBox.alert(errorRes.error.innererror.message);
                        }
                    }
                    return;

                }
                else {

                    MessageBox.alert(oErrorr.response.statusText);
                }


            },
            onDelete:function(){
                var copyBatch = [];
                var copyModel = this.getOwnerComponent().getModel();
                var gettingInternalTable = this.byId("LineItemsSmartTable").getTable(),
                    gettingItems = gettingInternalTable.getItems(),
                    oSelIndices = gettingInternalTable.getSelectedItems();
                for (var i; i < oSelIndices.length; i++) {
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

                    copyBatch.push(requestbody);

                }
                var params = {};
                params.groupId = "copyBatch";
                params.success = function () { };
                params.error = this.onErrorCall;
                for (var k; k < copyBatch.length; k++) {
                    copyModel.remove("/ZP_PF_BRK_ASSETCLS", copyBatch[k], params);

                }


            }

        });
    });
