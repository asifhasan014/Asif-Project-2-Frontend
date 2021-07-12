import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule } from "@ngx-translate/core";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { NgIdleModule } from "ng2-idle-core";
import { Ng2CompleterModule } from "ng2-completer";

import { UserSessionService } from "../common";
import { AlertComponent } from "../alert/_directives/index";
import { AlertService } from "../alert/_services/index";

import { HomeComponent } from "./home.component";
import { HomeRountingModule } from "./home-rounting.module";

import { HeaderComponent } from "./header/header.component";
import { LeftSideComponent } from "./left-side/left-side.component";
import { ControlSidebarComponent } from "./control-sidebar/control-sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

import { AgGridModule } from "ag-grid-angular";
import { BluecolumnComponent } from "../grid-ui/bluecolumn/bluecolumn.component";

import { UserComponent } from "../user/user.component";
import { UserdetailComponent } from "../user/detail/userdetail.component";
import { UsergridComponent } from "../user/grid/usergrid.component";

import { RoleComponent } from "../role/role.component";
import { RoledetailComponent } from "../role/detail/roledetail.component";
import { RolegridComponent } from "../role/grid/rolegrid.component";

import { FunctioncodeComponent } from "../functioncode/functioncode.component";
import { FunctioncodedetailComponent } from "../functioncode/detail/functioncodedetail.component";
import { FunctioncodegridComponent } from "../functioncode/grid/functioncodegrid.component";
import { UserroleComponent } from "../userrole/userrole.component";
import { RolefeatureComponent } from "../rolefeature/rolefeature.component";
import { ChangepasswordComponent } from "../changepassword/changepassword.component";
import { FileuploadComponent } from "../fileupload/fileupload.component";
import { FileuploaddetailComponent } from "../fileupload/detail/fileuploaddetail.component";
import { FileuploadgridComponent } from "../fileupload/grid/fileuploadgrid.component";
import { AudittrailComponent } from "../audittrail/audittrail.component";
import { AudittraildetailComponent } from "../audittrail/detail/audittraildetail.component";
import { AudittrailgridComponent } from "../audittrail/grid/audittrailgrid.component";
import { SampledashboardComponent } from "../sampledashboard/sampledashboard.component";
import { SampledashboarddetailComponent } from "../sampledashboard/detail/sampledashboarddetail.component";
import { SampledashboardgridComponent } from "../sampledashboard/grid/sampledashboardgrid.component";
import { MatDividerModule, MatCardModule } from "@angular/material";
import { AreaGraphComponent } from "../widgets/area-graph/area-graph.component";
import { HighchartsChartModule } from "highcharts-angular";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CardComponent } from "../widgets/card/card.component";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { PieComponent } from "../widgets/pie/pie.component";
import { NetworkGraphComponent } from "../widgets/network-graph/network-graph.component";
import { PercentageDataComponent } from "../widgets/percentage-data/percentage-data.component";
import { AutomationitemComponent } from "../automationitem/automationitem.component";
import { AutomationitemdetailComponent } from "../automationitem/detail/automationitemdetail.component";
import { AutomationitemgridComponent } from "../automationitem/grid/automationitemgrid.component";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material";
import { MatRadioModule } from "@angular/material/radio";
import { DcpoweractivitywiseslaComponent } from "../dcpoweractivitywisesla/dcpoweractivitywisesla.component";
import { DcpoweractivitywisesladetailComponent } from "../dcpoweractivitywisesla/detail/dcpoweractivitywisesladetail.component";
import { DcpoweractivitywiseslagridComponent } from "../dcpoweractivitywisesla/grid/dcpoweractivitywiseslagrid.component";
import { DcpoweritemwisewarrantyComponent } from "../dcpoweritemwisewarranty/dcpoweritemwisewarranty.component";
import { DcpoweritemwisewarrantydetailComponent } from "../dcpoweritemwisewarranty/detail/dcpoweritemwisewarrantydetail.component";
import { DcpoweritemwisewarrantygridComponent } from "../dcpoweritemwisewarranty/grid/dcpoweritemwisewarrantygrid.component";
import { DcpowervendorComponent } from "../dcpowervendor/dcpowervendor.component";
import { DcpowervendordetailComponent } from "../dcpowervendor/detail/dcpowervendordetail.component";
import { DcpowervendorgridComponent } from "../dcpowervendor/grid/dcpowervendorgrid.component";
import { DcpowersitelistComponent } from "../dcpowersitelist/dcpowersitelist.component";
import { DcpowersitelistdetailComponent } from "../dcpowersitelist/detail/dcpowersitelistdetail.component";
import { DcpowersitelistgridComponent } from "../dcpowersitelist/grid/dcpowersitelistgrid.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { AutomationwiseschedulerconfigurationComponent } from "../automationwiseschedulerconfiguration/automationwiseschedulerconfiguration.component";
import { AutomationwiseschedulerconfigurationdetailComponent } from "../automationwiseschedulerconfiguration/detail/automationwiseschedulerconfigurationdetail.component";
import { AutomationwiseschedulerconfigurationgridComponent } from "../automationwiseschedulerconfiguration/grid/automationwiseschedulerconfigurationgrid.component";
import { CronJobsModule } from "../lib-cron/cron-jobs.module";
import { PadhdisplaydevicepicstatusComponent } from "../padhdisplaydevicepicstatus/padhdisplaydevicepicstatus.component";
import { PadhdisplaydevicepicstatusdetailComponent } from "../padhdisplaydevicepicstatus/detail/padhdisplaydevicepicstatusdetail.component";
import { PadhdisplaydevicepicstatusgridComponent } from "../padhdisplaydevicepicstatus/grid/padhdisplaydevicepicstatusgrid.component";
import { MpbnassetinventoryComponent } from "../mpbnassetinventory/mpbnassetinventory.component";
import { MpbnassetinventorydetailComponent } from "../mpbnassetinventory/detail/mpbnassetinventorydetail.component";
import { MpbnassetinventorygridComponent } from "../mpbnassetinventory/grid/mpbnassetinventorygrid.component";
import { PadhdisplaydeviceComponent } from "../padhdisplaydevice/padhdisplaydevice.component";
import { PadhdisplaydevicedetailComponent } from "../padhdisplaydevice/detail/padhdisplaydevicedetail.component";
import { PadhdisplaydevicegridComponent } from "../padhdisplaydevice/grid/padhdisplaydevicegrid.component";
import { PadhdisplayhealthverboseComponent } from "../padhdisplayhealthverbose/padhdisplayhealthverbose.component";
import { PadhdisplayhealthverbosedetailComponent } from "../padhdisplayhealthverbose/detail/padhdisplayhealthverbosedetail.component";
import { PadhdisplayhealthverbosegridComponent } from "../padhdisplayhealthverbose/grid/padhdisplayhealthverbosegrid.component";
import { OnDemandExecutionDisplayDeviceComponent } from "../onDemandExecution/on-demand-execution-display-device/on-demand-execution-display-device.component";
import { FsadisplaysecuritypolicyruleallComponent } from "../fsadisplaysecuritypolicyruleall/fsadisplaysecuritypolicyruleall.component";
import { FsadisplaysecuritypolicyrulealldetailComponent } from "../fsadisplaysecuritypolicyruleall/detail/fsadisplaysecuritypolicyrulealldetail.component";
import { FsadisplaysecuritypolicyruleallgridComponent } from "../fsadisplaysecuritypolicyruleall/grid/fsadisplaysecuritypolicyruleallgrid.component";
import { FsadisplayfirewallsessionComponent } from "../fsadisplayfirewallsession/fsadisplayfirewallsession.component";
import { FsadisplayfirewallsessiondetailComponent } from "../fsadisplayfirewallsession/detail/fsadisplayfirewallsessiondetail.component";
import { FsadisplayfirewallsessiongridComponent } from "../fsadisplayfirewallsession/grid/fsadisplayfirewallsessiongrid.component";
import { AutomationschedulerComponent } from "../automationscheduler/automationscheduler.component";
import { AutomationschedulerdetailComponent } from "../automationscheduler/detail/automationschedulerdetail.component";
import { AutomationschedulergridComponent } from "../automationscheduler/grid/automationschedulergrid.component";
import { WarrantysupportclaimComponent } from "../warrantysupportclaim/warrantysupportclaim.component";
import { WarrantysupportclaimdetailComponent } from "../warrantysupportclaim/detail/warrantysupportclaimdetail.component";
import { WarrantysupportclaimgridComponent } from "../warrantysupportclaim/grid/warrantysupportclaimgrid.component";
import { OnDemandExcutionDdpicstatusComponent } from "../onDemandExecution/on-demand-excution-ddpicstatus/on-demand-excution-ddpicstatus.component";
import { HttpModule } from "@angular/http";
import { OnDemandExecutionDspruleallComponent } from "../onDemandExecution/on-demand-execution-dspruleall/on-demand-execution-dspruleall.component";
import { DcpowermanagementComponent } from "../dcpowermanagement/dcpowermanagement.component";
import { DcpowermanagementdetailComponent } from "../dcpowermanagement/detail/dcpowermanagementdetail.component";
import { DcpowermanagementgridComponent } from "../dcpowermanagement/grid/dcpowermanagementgrid.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { OnDemandDisplayHealthVerboseComponent } from "../onDemandExecution/on-demand-display-health-verbose/on-demand-display-health-verbose.component";
import { PadhdisplaydevicepredgridComponent } from "../padhdisplaydevicepred/grid/padhdisplaydevicepredgrid.component";
import { PadhhealthverbosepredgridComponent } from "../padhhealthverbosepred/grid/padhhealthverbosepredgrid.component";
import { PadhdisplaydevicepicstatuspredictiongridComponent } from "../padhdisplaydevicepicstatusprediction/grid/padhdisplaydevicepicstatuspredictiongrid.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SchedulestatusComponent } from "../schedulestatus/schedulestatus.component";
import { SchedulestatusdetailComponent } from "../schedulestatus/detail/schedulestatusdetail.component";
import { SchedulestatusgridComponent } from "../schedulestatus/grid/schedulestatusgrid.component";
import { PadhdisplaydevichealthvervosecpupredictionComponent } from "../padhdisplaydevichealthvervosecpuprediction/padhdisplaydevichealthvervosecpuprediction.component";
import { PadhdisplaydevichealthvervosecpupredictiondetailComponent } from "../padhdisplaydevichealthvervosecpuprediction/detail/padhdisplaydevichealthvervosecpupredictiondetail.component";
import { PadhdisplaydevichealthvervosecpupredictiongridComponent } from "../padhdisplaydevichealthvervosecpuprediction/grid/padhdisplaydevichealthvervosecpupredictiongrid.component";
import { PadhdisplaydevicehealthpredictionComponent } from "../padhdisplaydevicehealthprediction/padhdisplaydevicehealthprediction.component";
import { PadhdisplaydevicehealthpredictiondetailComponent } from "../padhdisplaydevicehealthprediction/detail/padhdisplaydevicehealthpredictiondetail.component";
import { PadhdisplaydevicehealthpredictiongridComponent } from "../padhdisplaydevicehealthprediction/grid/padhdisplaydevicehealthpredictiongrid.component";
import { OnDemandExecutionDfSessionComponent } from "../onDemandExecution/on-demand-execution-df-session/on-demand-execution-df-session.component";
import { PadhdisplaydevicepicstatuspredictionComponent } from "../padhdisplaydevicepicstatusprediction/padhdisplaydevicepicstatusprediction.component";
import { PadhdisplaydevicepredComponent } from "../padhdisplaydevicepred/padhdisplaydevicepred.component";
import { TrafficpathanalysisComponent } from "../trafficpathanalysis/trafficpathanalysis.component";
import { TrafficpathanalysisdetailComponent } from "../trafficpathanalysis/detail/trafficpathanalysisdetail.component";
import { TrafficpathanalysisgridComponent } from "../trafficpathanalysis/grid/trafficpathanalysisgrid.component";
import { OnDemandTrafficPathAnalysisComponent } from "../onDemandExecution/on-demand-traffic-path-analysis/on-demand-traffic-path-analysis.component";
import { LdsettlementincidentComponent } from "../ldsettlementincident/ldsettlementincident.component";
import { LdsettlementincidentdetailComponent } from "../ldsettlementincident/detail/ldsettlementincidentdetail.component";
import { LdsettlementincidentgridComponent } from "../ldsettlementincident/grid/ldsettlementincidentgrid.component";
import { LdsettlementsitedownComponent } from "../ldsettlementsitedown/ldsettlementsitedown.component";
import { LdsettlementsitedowndetailComponent } from "../ldsettlementsitedown/detail/ldsettlementsitedowndetail.component";
import { LdsettlementsitedowngridComponent } from "../ldsettlementsitedown/grid/ldsettlementsitedowngrid.component";

import { LdsettlementdclowComponent } from "../ldsettlementdclow/ldsettlementdclow.component";
import { LdsettlementdclowdetailComponent } from "../ldsettlementdclow/detail/ldsettlementdclowdetail.component";
import { LdsettlementdclowgridComponent } from "../ldsettlementdclow/grid/ldsettlementdclowgrid.component";
import { LdsettlementpgComponent } from "../ldsettlementpg/ldsettlementpg.component";
import { LdsettlementpgdetailComponent } from "../ldsettlementpg/detail/ldsettlementpgdetail.component";
import { LdsettlementpggridComponent } from "../ldsettlementpg/grid/ldsettlementpggrid.component";
import { LdsettlementmainsfailureComponent } from "../ldsettlementmainsfailure/ldsettlementmainsfailure.component";
import { LdsettlementmainsfailuredetailComponent } from "../ldsettlementmainsfailure/detail/ldsettlementmainsfailuredetail.component";
import { LdsettlementmainsfailuregridComponent } from "../ldsettlementmainsfailure/grid/ldsettlementmainsfailuregrid.component";
import { LdsettlementgensetonloadreportComponent } from "../ldsettlementgensetonloadreport/ldsettlementgensetonloadreport.component";
import { LdsettlementgensetonloadreportdetailComponent } from "../ldsettlementgensetonloadreport/detail/ldsettlementgensetonloadreportdetail.component";
import { LdsettlementgensetonloadreportgridComponent } from "../ldsettlementgensetonloadreport/grid/ldsettlementgensetonloadreportgrid.component";
import { LdsettlementsiteavailabilityComponent } from "../ldsettlementsiteavailability/ldsettlementsiteavailability.component";
import { LdsettlementsiteavailabilitydetailComponent } from "../ldsettlementsiteavailability/detail/ldsettlementsiteavailabilitydetail.component";
import { LdsettlementsiteavailabilitygridComponent } from "../ldsettlementsiteavailability/grid/ldsettlementsiteavailabilitygrid.component";
import { LdsettlementexternalalarmComponent } from "../ldsettlementexternalalarm/ldsettlementexternalalarm.component";
import { LdsettlementexternalalarmdetailComponent } from "../ldsettlementexternalalarm/detail/ldsettlementexternalalarmdetail.component";
import { LdsettlementexternalalarmgridComponent } from "../ldsettlementexternalalarm/grid/ldsettlementexternalalarmgrid.component";
import { TrafficpathkpireportComponent } from "../trafficpathkpireport/trafficpathkpireport.component";
import { TrafficpathkpireportdetailComponent } from "../trafficpathkpireport/detail/trafficpathkpireportdetail.component";
import { TrafficpathkpireportgridComponent } from "../trafficpathkpireport/grid/trafficpathkpireportgrid.component";
import { MatTableModule } from "@angular/material/table";
import { MatListModule } from "@angular/material/list";
import { Performancedatau2000ipComponent } from "../performancedatau2000ip/performancedatau2000ip.component";
import { Performancedatau2000ipdetailComponent } from "../performancedatau2000ip/detail/performancedatau2000ipdetail.component";
import { Performancedatau2000ipgridComponent } from "../performancedatau2000ip/grid/performancedatau2000ipgrid.component";
import { PendingunusedfirewallruleComponent } from "../pendingunusedfirewallrule/pendingunusedfirewallrule.component";
import { PendingunusedfirewallruledetailComponent } from "../pendingunusedfirewallrule/detail/pendingunusedfirewallruledetail.component";
import { PendingunusedfirewallrulegridComponent } from "../pendingunusedfirewallrule/grid/pendingunusedfirewallrulegrid.component";
import { LdsettlementdecisionComponent } from "../ldsettlementdecision/ldsettlementdecision.component";
import { LdsettlementdecisiondetailComponent } from "../ldsettlementdecision/detail/ldsettlementdecisiondetail.component";
import { LdsettlementdecisiongridComponent } from "../ldsettlementdecision/grid/ldsettlementdecisiongrid.component";
import { SitewisedcavailabilityandldvalueComponent } from "../sitewisedcavailabilityandldvalue/sitewisedcavailabilityandldvalue.component";
import { SitewisedcavailabilityandldvaluedetailComponent } from "../sitewisedcavailabilityandldvalue/detail/sitewisedcavailabilityandldvaluedetail.component";
import { SitewisedcavailabilityandldvaluegridComponent } from "../sitewisedcavailabilityandldvalue/grid/sitewisedcavailabilityandldvaluegrid.component";
import { SemalarmdataComponent } from "../semalarmdata/semalarmdata.component";
import { SemalarmdatadetailComponent } from "../semalarmdata/detail/semalarmdatadetail.component";
import { SemalarmdatagridComponent } from "../semalarmdata/grid/semalarmdatagrid.component";
import { LinkfromdigitouchComponent } from "../linkfromdigitouch/linkfromdigitouch.component";
import { LinkfromdigitouchdetailComponent } from "../linkfromdigitouch/detail/linkfromdigitouchdetail.component";
import { LinkfromdigitouchgridComponent } from "../linkfromdigitouch/grid/linkfromdigitouchgrid.component";
import { LdsettlementsiteprioritykpiComponent } from "../ldsettlementsiteprioritykpi/ldsettlementsiteprioritykpi.component";
import { LdsettlementsiteprioritykpidetailComponent } from "../ldsettlementsiteprioritykpi/detail/ldsettlementsiteprioritykpidetail.component";
import { LdsettlementsiteprioritykpigridComponent } from "../ldsettlementsiteprioritykpi/grid/ldsettlementsiteprioritykpigrid.component";
import { LdsettlementldcalculationComponent } from "../ldsettlementldcalculation/ldsettlementldcalculation.component";
import { LdsettlementldcalculationdetailComponent } from "../ldsettlementldcalculation/detail/ldsettlementldcalculationdetail.component";
import { LdsettlementldcalculationgridComponent } from "../ldsettlementldcalculation/grid/ldsettlementldcalculationgrid.component";
import { AlarmnameComponent } from "../alarmname/alarmname.component";
import { AlarmnamedetailComponent } from "../alarmname/detail/alarmnamedetail.component";
import { AlarmnamegridComponent } from "../alarmname/grid/alarmnamegrid.component";
import { AlarmchildComponent } from "../alarmchild/alarmchild.component";
import { AlarmchilddetailComponent } from "../alarmchild/detail/alarmchilddetail.component";
import { AlarmchildgridComponent } from "../alarmchild/grid/alarmchildgrid.component";
import { AlarmoduslotmappingComponent } from "../alarmoduslotmapping/alarmoduslotmapping.component";
import { AlarmoduslotmappingdetailComponent } from "../alarmoduslotmapping/detail/alarmoduslotmappingdetail.component";
import { AlarmoduslotmappinggridComponent } from "../alarmoduslotmapping/grid/alarmoduslotmappinggrid.component";
import { LdsettlementDashboardComponent } from "../LDSettlementDashboard/ldsettlement-dashboard/ldsettlement-dashboard.component";
import { TroubleticketComponent } from "../troubleticket/troubleticket.component";
import { TroubleticketdetailComponent } from "../troubleticket/detail/troubleticketdetail.component";
import { TroubleticketgridComponent } from "../troubleticket/grid/troubleticketgrid.component";
import { DcpowerrequesttypeComponent } from "../dcpowerrequesttype/dcpowerrequesttype.component";
import { DcpowerrequesttypedetailComponent } from "../dcpowerrequesttype/detail/dcpowerrequesttypedetail.component";
import { DcpowerrequesttypegridComponent } from "../dcpowerrequesttype/grid/dcpowerrequesttypegrid.component";
import { DcpowerrequestdevicetypeComponent } from "../dcpowerrequestdevicetype/dcpowerrequestdevicetype.component";
import { DcpowerrequestdevicetypedetailComponent } from "../dcpowerrequestdevicetype/detail/dcpowerrequestdevicetypedetail.component";
import { DcpowerrequestdevicetypegridComponent } from "../dcpowerrequestdevicetype/grid/dcpowerrequestdevicetypegrid.component";
import { MwalarmdashboardComponent } from "../mwalarmdashboard/mwalarmdashboard.component";
import { MwalarmdashboarddetailComponent } from "../mwalarmdashboard/detail/mwalarmdashboarddetail.component";
import { MwalarmdashboardgridComponent } from "../mwalarmdashboard/grid/mwalarmdashboardgrid.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MatExpansionModule } from "@angular/material/expansion";

import { RocComponent } from "../roc/roc.component";
import { RocdetailComponent } from "../roc/detail/rocdetail.component";
import { RocgridComponent } from "../roc/grid/rocgrid.component";

import { LocationhierarchyossComponent } from "../locationhierarchyoss/locationhierarchyoss.component";
import { LocationhierarchyossdetailComponent } from "../locationhierarchyoss/detail/locationhierarchyossdetail.component";
import { LocationhierarchyossgridComponent } from "../locationhierarchyoss/grid/locationhierarchyossgrid.component";
import { ChartconfigurationComponent } from "../chartconfiguration/chartconfiguration.component";
import { ChartconfigurationdetailComponent } from "../chartconfiguration/detail/chartconfigurationdetail.component";
import { ChartconfigurationgridComponent } from "../chartconfiguration/grid/chartconfigurationgrid.component";
import { MatTableExporterModule } from "mat-table-exporter";
import { TicketassignedgroupComponent } from "../ticketassignedgroup/ticketassignedgroup.component";
import { TicketassignedgroupdetailComponent } from "../ticketassignedgroup/detail/ticketassignedgroupdetail.component";
import { TicketassignedgroupgridComponent } from "../ticketassignedgroup/grid/ticketassignedgroupgrid.component";
import { EricssonrslComponent } from "../ericssonrsl/ericssonrsl.component";
import { EricssonrsldetailComponent } from "../ericssonrsl/detail/ericssonrsldetail.component";
import { EricssonrslgridComponent } from "../ericssonrsl/grid/ericssonrslgrid.component";
import { EricssontslComponent } from "../ericssontsl/ericssontsl.component";
import { EricssontsldetailComponent } from "../ericssontsl/detail/ericssontsldetail.component";
import { EricssontslgridComponent } from "../ericssontsl/grid/ericssontslgrid.component";
import { HuaweirsltslComponent } from "../huaweirsltsl/huaweirsltsl.component";
import { HuaweirsltsldetailComponent } from "../huaweirsltsl/detail/huaweirsltsldetail.component";
import { HuaweirsltslgridComponent } from "../huaweirsltsl/grid/huaweirsltslgrid.component";
import { SoemconfigdataminlinktnethComponent } from "../soemconfigdataminlinktneth/soemconfigdataminlinktneth.component";
import { SoemconfigdataminlinktnethdetailComponent } from "../soemconfigdataminlinktneth/detail/soemconfigdataminlinktnethdetail.component";
import { SoemconfigdataminlinktnethgridComponent } from "../soemconfigdataminlinktneth/grid/soemconfigdataminlinktnethgrid.component";
import { MwutilizationdashboardComponent } from "../mwutilizationdashboard/mwutilizationdashboard.component";
import { MwutilizationdashboarddetailComponent } from "../mwutilizationdashboard/detail/mwutilizationdashboarddetail.component";
import { MwutilizationdashboardgridComponent } from "../mwutilizationdashboard/grid/mwutilizationdashboardgrid.component";
import { UtilisationericssonlanComponent } from "../utilisationericssonlan/utilisationericssonlan.component";
import { UtilisationericssonlandetailComponent } from "../utilisationericssonlan/detail/utilisationericssonlandetail.component";
import { UtilisationericssonlangridComponent } from "../utilisationericssonlan/grid/utilisationericssonlangrid.component";
import { UtilisationericssonwanComponent } from "../utilisationericssonwan/utilisationericssonwan.component";
import { UtilisationericssonwandetailComponent } from "../utilisationericssonwan/detail/utilisationericssonwandetail.component";
import { UtilisationericssonwangridComponent } from "../utilisationericssonwan/grid/utilisationericssonwangrid.component";
import { MwrsltsldashboardComponent } from "../mwrsltsldashboard/mwrsltsldashboard.component";
import { MwrsltsldashboarddetailComponent } from "../mwrsltsldashboard/detail/mwrsltsldashboarddetail.component";
import { MwrsltsldashboardgridComponent } from "../mwrsltsldashboard/grid/mwrsltsldashboardgrid.component";
import { TicketingfilterComponent } from "../ticketingfilter/ticketingfilter.component";
import { TicketingfilterdetailComponent } from "../ticketingfilter/detail/ticketingfilterdetail.component";
import { TicketingfiltergridComponent } from "../ticketingfilter/grid/ticketingfiltergrid.component";
import { DashboardconfigurationforrsltslComponent } from "../dashboardconfigurationforrsltsl/dashboardconfigurationforrsltsl.component";
import { DashboardconfigurationforrsltsldetailComponent } from "../dashboardconfigurationforrsltsl/detail/dashboardconfigurationforrsltsldetail.component";
import { DashboardconfigurationforrsltslgridComponent } from "../dashboardconfigurationforrsltsl/grid/dashboardconfigurationforrsltslgrid.component";
import { ConfigurablecategoryComponent } from "../configurablecategory/configurablecategory.component";
import { ConfigurablecategorydetailComponent } from "../configurablecategory/detail/configurablecategorydetail.component";
import { ConfigurablecategorygridComponent } from "../configurablecategory/grid/configurablecategorygrid.component";
import { MicrowavelinkreportComponent } from "../microwavelinkreport/microwavelinkreport.component";
import { MicrowavelinkreportdetailComponent } from "../microwavelinkreport/detail/microwavelinkreportdetail.component";
import { MicrowavelinkreportgridComponent } from "../microwavelinkreport/grid/microwavelinkreportgrid.component";
import { RsltslvariationComponent } from "../rsltslvariation/rsltslvariation.component";
import { RsltslvariationdetailComponent } from "../rsltslvariation/detail/rsltslvariationdetail.component";
import { RsltslvariationgridComponent } from "../rsltslvariation/grid/rsltslvariationgrid.component";

import { HuaweiportutilizationComponent } from "../huaweiportutilization/huaweiportutilization.component";
import { HuaweiportutilizationdetailComponent } from "../huaweiportutilization/detail/huaweiportutilizationdetail.component";
import { HuaweiportutilizationgridComponent } from "../huaweiportutilization/grid/huaweiportutilizationgrid.component";
import { SnackbarComponent } from "../showvalidationinfo/component/snackbar/snackbar.component";
import { MwadaptivemodulationdashboardComponent } from "../mwadaptivemodulationdashboard/mwadaptivemodulationdashboard.component";
import { MwadaptivemodulationdashboarddetailComponent } from "../mwadaptivemodulationdashboard/detail/mwadaptivemodulationdashboarddetail.component";
import { MwadaptivemodulationdashboardgridComponent } from "../mwadaptivemodulationdashboard/grid/mwadaptivemodulationdashboardgrid.component";
import { AdaptivemodulationdashboardconfigurationComponent } from "../adaptivemodulationdashboardconfiguration/adaptivemodulationdashboardconfiguration.component";
import { AdaptivemodulationdashboardconfigurationdetailComponent } from "../adaptivemodulationdashboardconfiguration/detail/adaptivemodulationdashboardconfigurationdetail.component";
import { AdaptivemodulationdashboardconfigurationgridComponent } from "../adaptivemodulationdashboardconfiguration/grid/adaptivemodulationdashboardconfigurationgrid.component";
import { LicensingdashboardconfigurationComponent } from "../licensingdashboardconfiguration/licensingdashboardconfiguration.component";
import { LicensingdashboardconfigurationdetailComponent } from "../licensingdashboardconfiguration/detail/licensingdashboardconfigurationdetail.component";
import { LicensingdashboardconfigurationgridComponent } from "../licensingdashboardconfiguration/grid/licensingdashboardconfigurationgrid.component";
import { LicensingdashboardComponent } from "../licensingdashboard/licensingdashboard.component";
import { LicensingdashboarddetailComponent } from "../licensingdashboard/detail/licensingdashboarddetail.component";
import { LicensingdashboardgridComponent } from "../licensingdashboard/grid/licensingdashboardgrid.component";
import { UniquelinktableforsltslComponent } from "../uniquelinktableforsltsl/uniquelinktableforsltsl.component";
import { UniquelinktableforsltsldetailComponent } from "../uniquelinktableforsltsl/detail/uniquelinktableforsltsldetail.component";
import { UniquelinktableforsltslgridComponent } from "../uniquelinktableforsltsl/grid/uniquelinktableforsltslgrid.component";
import { UniquelinktableforutilizationComponent } from "../uniquelinktableforutilization/uniquelinktableforutilization.component";
import { UniquelinktableforutilizationdetailComponent } from "../uniquelinktableforutilization/detail/uniquelinktableforutilizationdetail.component";
import { UniquelinktableforutilizationgridComponent } from "../uniquelinktableforutilization/grid/uniquelinktableforutilizationgrid.component";
import { UniqueinterfacetableforutilizationComponent } from '../uniqueinterfacetableforutilization/uniqueinterfacetableforutilization.component';
import { UniqueinterfacetableforutilizationdetailComponent } from '../uniqueinterfacetableforutilization/detail/uniqueinterfacetableforutilizationdetail.component';
import { UniqueinterfacetableforutilizationgridComponent } from '../uniqueinterfacetableforutilization/grid/uniqueinterfacetableforutilizationgrid.component';

import { CustomerinsightavailabiltyComponent } from '../customerinsightavailabilty/customerinsightavailabilty.component';
import { CustomerinsightavailabiltydetailComponent } from '../customerinsightavailabilty/detail/customerinsightavailabiltydetail.component';
import { CustomerinsightavailabiltygridComponent } from '../customerinsightavailabilty/grid/customerinsightavailabiltygrid.component';
import { FileDropComponent } from "../fileuploaddirective/file-drop.component";
import { UtilizationdashboardconfigurationComponent } from '../utilizationdashboardconfiguration/utilizationdashboardconfiguration.component';
import { UtilizationdashboardconfigurationdetailComponent } from '../utilizationdashboardconfiguration/detail/utilizationdashboardconfigurationdetail.component';
import { UtilizationdashboardconfigurationgridComponent } from '../utilizationdashboardconfiguration/grid/utilizationdashboardconfigurationgrid.component';
import { EricssonmodulationComponent } from '../ericssonmodulation/ericssonmodulation.component';
import { EricssonmodulationdetailComponent } from '../ericssonmodulation/detail/ericssonmodulationdetail.component';
import { EricssonmodulationgridComponent } from '../ericssonmodulation/grid/ericssonmodulationgrid.component';

import { MwdcndashboardComponent } from '../mwdcndashboard/mwdcndashboard.component';
import { MwdcndashboarddetailComponent } from '../mwdcndashboard/detail/mwdcndashboarddetail.component';
import { MwdcndashboardgridComponent } from '../mwdcndashboard/grid/mwdcndashboardgrid.component';
import { MwdcndashboardconfigurationComponent } from '../mwdcndashboardconfiguration/mwdcndashboardconfiguration.component';
import { MwdcndashboardconfigurationdetailComponent } from '../mwdcndashboardconfiguration/detail/mwdcndashboardconfigurationdetail.component';
import { MwdcndashboardconfigurationgridComponent } from '../mwdcndashboardconfiguration/grid/mwdcndashboardconfigurationgrid.component';
import { UnusedandmostusedrulereportComponent } from '../unusedandmostusedrulereport/component/unusedandmostusedrulereport/unusedandmostusedrulereport.component';
import { DenyhitipreportComponent } from '../denyhitipreport/component/denyhitipreport/denyhitipreport.component';

import { UniquelinktableforadaptivemodulationComponent } from '../uniquelinktableforadaptivemodulation/uniquelinktableforadaptivemodulation.component';
import { UniquelinktableforadaptivemodulationdetailComponent } from '../uniquelinktableforadaptivemodulation/detail/uniquelinktableforadaptivemodulationdetail.component';
import { UniquelinktableforadaptivemodulationgridComponent } from '../uniquelinktableforadaptivemodulation/grid/uniquelinktableforadaptivemodulationgrid.component';

import { InformationrepositoryComponent } from '../informationrepository/informationrepository.component';
import { InformationrepositorydetailComponent } from '../informationrepository/detail/informationrepositorydetail.component';
import { InformationrepositorygridComponent } from '../informationrepository/grid/informationrepositorygrid.component';

import { EricssonlicensefalmoduleinventoryComponent } from '../ericssonlicensefalmoduleinventory/ericssonlicensefalmoduleinventory.component';
import { EricssonlicensefalmoduleinventorydetailComponent } from '../ericssonlicensefalmoduleinventory/detail/ericssonlicensefalmoduleinventorydetail.component';
import { EricssonlicensefalmoduleinventorygridComponent } from '../ericssonlicensefalmoduleinventory/grid/ericssonlicensefalmoduleinventorygrid.component';

import { EricssonlicensemoduleinventoryComponent } from '../ericssonlicensemoduleinventory/ericssonlicensemoduleinventory.component';
import { EricssonlicensemoduleinventorydetailComponent } from '../ericssonlicensemoduleinventory/detail/ericssonlicensemoduleinventorydetail.component';
import { EricssonlicensemoduleinventorygridComponent } from '../ericssonlicensemoduleinventory/grid/ericssonlicensemoduleinventorygrid.component';

import { QosradioqualityericssonComponent } from '../qosradioqualityericsson/qosradioqualityericsson.component';
import { QosradioqualityericssondetailComponent } from '../qosradioqualityericsson/detail/qosradioqualityericssondetail.component';
import { QosradioqualityericssongridComponent } from '../qosradioqualityericsson/grid/qosradioqualityericssongrid.component';

import { MwqosdashboardconfigurationComponent } from '../mwqosdashboardconfiguration/mwqosdashboardconfiguration.component';
import { MwqosdashboardconfigurationdetailComponent } from '../mwqosdashboardconfiguration/detail/mwqosdashboardconfigurationdetail.component';
import { MwqosdashboardconfigurationgridComponent } from '../mwqosdashboardconfiguration/grid/mwqosdashboardconfigurationgrid.component';

import { MwqosdashboardComponent } from '../mwqosdashboard/mwqosdashboard.component';
import { MwqosdashboarddetailComponent } from '../mwqosdashboard/detail/mwqosdashboarddetail.component';
import { MwqosdashboardgridComponent } from '../mwqosdashboard/grid/mwqosdashboardgrid.component';
import { ServerhealthcheckinventoryComponent } from '../serverhealthcheckinventory/serverhealthcheckinventory.component';
import { ServerhealthcheckinventorydetailComponent } from '../serverhealthcheckinventory/detail/serverhealthcheckinventorydetail.component';
import { ServerhealthcheckinventorygridComponent } from '../serverhealthcheckinventory/grid/serverhealthcheckinventorygrid.component';

import { HuaweilicenseComponent } from '../huaweilicense/huaweilicense.component';
import { HuaweilicensedetailComponent } from '../huaweilicense/detail/huaweilicensedetail.component';
import { HuaweilicensegridComponent } from '../huaweilicense/grid/huaweilicensegrid.component';

import { DcnericssonalarmComponent } from '../dcnericssonalarm/dcnericssonalarm.component';
import { DcnericssonalarmdetailComponent } from '../dcnericssonalarm/detail/dcnericssonalarmdetail.component';
import { DcnericssonalarmgridComponent } from '../dcnericssonalarm/grid/dcnericssonalarmgrid.component';


import { BackupnodeComponent } from '../backupnode/backupnode.component';
import { BackupnodedetailComponent } from '../backupnode/detail/backupnodedetail.component';
import { BackupnodegridComponent } from '../backupnode/grid/backupnodegrid.component';

import { BackuphistoryComponent } from '../backuphistory/backuphistory.component';
import { BackuphistorydetailComponent } from '../backuphistory/detail/backuphistorydetail.component';
import { BackuphistorygridComponent } from '../backuphistory/grid/backuphistorygrid.component';

import { BackuppolicyComponent } from '../backuppolicy/backuppolicy.component';
import { BackuppolicydetailComponent } from '../backuppolicy/detail/backuppolicydetail.component';
import { BackuppolicygridComponent } from '../backuppolicy/grid/backuppolicygrid.component';

import { BackupcalendarComponent } from '../backupcalendar/backupcalendar.component';
import { BackupcalendardetailComponent } from '../backupcalendar/detail/backupcalendardetail.component';
import { BackupcalendargridComponent } from '../backupcalendar/grid/backupcalendargrid.component';

import { LicensinghuaweidashboardComponent } from '../licensinghuaweidashboard/licensinghuaweidashboard.component';
import { LicensinghuaweidashboarddetailComponent } from '../licensinghuaweidashboard/detail/licensinghuaweidashboarddetail.component';
import { LicensinghuaweidashboardgridComponent } from '../licensinghuaweidashboard/grid/licensinghuaweidashboardgrid.component';

import { LicensingreportComponent } from '../licensingreport/licensingreport.component';
import { LicensingreportdetailComponent } from '../licensingreport/detail/licensingreportdetail.component';
import { LicensingreportgridComponent } from '../licensingreport/grid/licensingreportgrid.component';

import { QosconfigurationstandardComponent } from '../qosconfigurationstandard/qosconfigurationstandard.component';
import { QosconfigurationstandarddetailComponent } from '../qosconfigurationstandard/detail/qosconfigurationstandarddetail.component';
import { QosconfigurationstandardgridComponent } from '../qosconfigurationstandard/grid/qosconfigurationstandardgrid.component';

import { UserprioritymappingconfigurationvalueComponent } from '../userprioritymappingconfigurationvalue/userprioritymappingconfigurationvalue.component';
import { UserprioritymappingconfigurationvaluedetailComponent } from '../userprioritymappingconfigurationvalue/detail/userprioritymappingconfigurationvaluedetail.component';
import { UserprioritymappingconfigurationvaluegridComponent } from '../userprioritymappingconfigurationvalue/grid/userprioritymappingconfigurationvaluegrid.component';

import { HuaweiqosComponent } from '../huaweiqos/huaweiqos.component';
import { HuaweiqosdetailComponent } from '../huaweiqos/detail/huaweiqosdetail.component';
import { HuaweiqosgridComponent } from '../huaweiqos/grid/huaweiqosgrid.component';

import { ServerhealthreportComponent } from '../serverhealthreport/serverhealthreport.component';
import { ServerhealthreportdetailComponent } from '../serverhealthreport/detail/serverhealthreportdetail.component';
import { ServerhealthreportgridComponent } from '../serverhealthreport/grid/serverhealthreportgrid.component';

import { QosericssontnethComponent } from '../qosericssontneth/qosericssontneth.component';
import { QosericssontnethdetailComponent } from '../qosericssontneth/detail/qosericssontnethdetail.component';
import { QosericssontnethgridComponent } from '../qosericssontneth/grid/qosericssontnethgrid.component';

import { MwserviceqosdashboardComponent } from '../mwserviceqosdashboard/mwserviceqosdashboard.component';
import { MwserviceqosdashboarddetailComponent } from '../mwserviceqosdashboard/detail/mwserviceqosdashboarddetail.component';
import { MwserviceqosdashboardgridComponent } from '../mwserviceqosdashboard/grid/mwserviceqosdashboardgrid.component';

import { MwserviceqosdashboardconfigurationComponent } from '../mwserviceqosdashboardconfiguration/mwserviceqosdashboardconfiguration.component';
import { MwserviceqosdashboardconfigurationdetailComponent } from '../mwserviceqosdashboardconfiguration/detail/mwserviceqosdashboardconfigurationdetail.component';
import { MwserviceqosdashboardconfigurationgridComponent } from '../mwserviceqosdashboardconfiguration/grid/mwserviceqosdashboardconfigurationgrid.component';

import { EmsfiledirectoryrepositoryComponent } from '../emsfiledirectoryrepository/emsfiledirectoryrepository.component';
import { EmsfiledirectoryrepositorydetailComponent } from '../emsfiledirectoryrepository/detail/emsfiledirectoryrepositorydetail.component';
import { EmsfiledirectoryrepositorygridComponent } from '../emsfiledirectoryrepository/grid/emsfiledirectoryrepositorygrid.component';

import { OnDemandHealthCheckComponent } from '../onDemandHealthCheck/on-demand-health-check/on-demand-health-check.component';

import { EmsfileavailabilityreportComponent } from '../emsfileavailabilityreport/emsfileavailabilityreport.component';
import { EmsfileavailabilityreportdetailComponent } from '../emsfileavailabilityreport/detail/emsfileavailabilityreportdetail.component';
import { EmsfileavailabilityreportgridComponent } from '../emsfileavailabilityreport/grid/emsfileavailabilityreportgrid.component';
import { OnDemandEmsFileDirectoryCheckComponent } from '../onDemandEmsFileDirectoryCheck/on-demand-ems-file-directory-check/on-demand-ems-file-directory-check.component';
import { QosericssonconfigurationdataComponent } from '../qosericssonconfigurationdata/qosericssonconfigurationdata.component';
import { QosericssonconfigurationdatadetailComponent } from '../qosericssonconfigurationdata/detail/qosericssonconfigurationdatadetail.component';
import { QosericssonconfigurationdatagridComponent } from '../qosericssonconfigurationdata/grid/qosericssonconfigurationdatagrid.component';
import { SoemneinventoryComponent } from '../soemneinventory/soemneinventory.component';
import { SoemneinventorydetailComponent } from '../soemneinventory/detail/soemneinventorydetail.component';
import { SoemneinventorygridComponent } from '../soemneinventory/grid/soemneinventorygrid.component';
import { HuaweiinterfaceportreportComponent } from '../huaweiinterfaceportreport/huaweiinterfaceportreport.component';
import { HuaweiinterfaceportreportdetailComponent } from '../huaweiinterfaceportreport/detail/huaweiinterfaceportreportdetail.component';
import { HuaweiinterfaceportreportgridComponent } from '../huaweiinterfaceportreport/grid/huaweiinterfaceportreportgrid.component';
import { DatascriptsstoryComponent } from '../datascriptsstory/datascriptsstory.component';
import { DatascriptsstorydetailComponent } from '../datascriptsstory/detail/datascriptsstorydetail.component';
import { DatascriptsstorygridComponent } from '../datascriptsstory/grid/datascriptsstorygrid.component';
import { ComprehensivedashboardconfigurationComponent } from '../comprehensivedashboardconfiguration/comprehensivedashboardconfiguration.component';
import { ComprehensivedashboardconfigurationdetailComponent } from '../comprehensivedashboardconfiguration/detail/comprehensivedashboardconfigurationdetail.component';
import { ComprehensivedashboardconfigurationgridComponent } from '../comprehensivedashboardconfiguration/grid/comprehensivedashboardconfigurationgrid.component';
import { ComprehensivedashboardComponent } from '../comprehensivedashboard/comprehensivedashboard.component';
import { ComprehensivedashboarddetailComponent } from '../comprehensivedashboard/detail/comprehensivedashboarddetail.component';
import { ComprehensivedashboardgridComponent } from '../comprehensivedashboard/grid/comprehensivedashboardgrid.component';
import { DcpowerbulkrequestComponent } from '../dcpowerbulkrequest/dcpowerbulkrequest.component';
import { DcpowerbulkrequestdetailComponent } from '../dcpowerbulkrequest/detail/dcpowerbulkrequestdetail.component';
import { DcpowerbulkrequestgridComponent } from '../dcpowerbulkrequest/grid/dcpowerbulkrequestgrid.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRountingModule,
    HttpClientModule,
    TranslateModule,
    NgbDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    AgGridModule.withComponents([BluecolumnComponent]),
    NgIdleModule.forRoot(),
    Ng2CompleterModule,
    MatDividerModule,
    HighchartsChartModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    CronJobsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatRadioModule,
    RxReactiveFormsModule,
    MatListModule,
    MatTableModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatExpansionModule,
    MatTableExporterModule,
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    LeftSideComponent,
    ControlSidebarComponent,
    FooterComponent,
    DashboardComponent,
    UserComponent,
    BluecolumnComponent,
    UserdetailComponent,
    UsergridComponent,
    AlertComponent,
    RoleComponent,
    RoledetailComponent,
    RolegridComponent,
    FunctioncodeComponent,
    FunctioncodedetailComponent,
    FunctioncodegridComponent,
    UserroleComponent,
    RolefeatureComponent,
    ChangepasswordComponent,
    FileuploadComponent,
    FileuploaddetailComponent,
    FileuploadgridComponent,
    AudittrailComponent,
    AudittraildetailComponent,
    AudittrailgridComponent,
    SampledashboardComponent,
    SampledashboarddetailComponent,
    SampledashboardgridComponent,
    AreaGraphComponent,
    CardComponent,
    PieComponent,
    NetworkGraphComponent,
    PercentageDataComponent,
    AutomationitemComponent,
    AutomationitemdetailComponent,
    AutomationitemgridComponent,
    AutomationwiseschedulerconfigurationComponent,
    AutomationwiseschedulerconfigurationdetailComponent,
    AutomationwiseschedulerconfigurationgridComponent,
    PadhdisplaydevicepicstatusComponent,
    PadhdisplaydevicepicstatusdetailComponent,
    PadhdisplaydevicepicstatusgridComponent,
    MpbnassetinventoryComponent,
    MpbnassetinventorydetailComponent,
    MpbnassetinventorygridComponent,
    PadhdisplaydeviceComponent,
    PadhdisplaydevicedetailComponent,
    PadhdisplaydevicegridComponent,
    PadhdisplayhealthverboseComponent,
    PadhdisplayhealthverbosedetailComponent,
    PadhdisplayhealthverbosegridComponent,
    OnDemandExecutionDisplayDeviceComponent,
    PadhdisplayhealthverbosegridComponent,
    FsadisplaysecuritypolicyruleallComponent,
    FsadisplaysecuritypolicyrulealldetailComponent,
    FsadisplaysecuritypolicyruleallgridComponent,
    FsadisplayfirewallsessionComponent,
    FsadisplayfirewallsessiondetailComponent,
    FsadisplayfirewallsessiongridComponent,
    AutomationschedulerComponent,
    AutomationschedulerdetailComponent,
    AutomationschedulergridComponent,
    WarrantysupportclaimComponent,
    WarrantysupportclaimdetailComponent,
    WarrantysupportclaimgridComponent,
    OnDemandExecutionDspruleallComponent,
    DcpowermanagementComponent,
    DcpowermanagementdetailComponent,
    DcpowermanagementgridComponent,
    OnDemandDisplayHealthVerboseComponent,
    WarrantysupportclaimgridComponent,
    OnDemandExcutionDdpicstatusComponent,
    WarrantysupportclaimgridComponent,
    OnDemandExecutionDspruleallComponent,
    DcpoweractivitywiseslaComponent,
    DcpoweractivitywisesladetailComponent,
    DcpoweractivitywiseslagridComponent,
    DcpoweritemwisewarrantyComponent,
    DcpoweritemwisewarrantydetailComponent,
    DcpoweritemwisewarrantygridComponent,
    DcpowervendorComponent,
    DcpowervendordetailComponent,
    DcpowervendorgridComponent,
    DcpowersitelistComponent,
    DcpowersitelistdetailComponent,
    DcpowersitelistgridComponent,
    PadhdisplaydevicepredgridComponent,
    PadhhealthverbosepredgridComponent,
    PadhdisplaydevicepicstatuspredictiongridComponent,
    SchedulestatusComponent,
    SchedulestatusdetailComponent,
    SchedulestatusgridComponent,
    PadhdisplaydevichealthvervosecpupredictionComponent,
    PadhdisplaydevichealthvervosecpupredictiondetailComponent,
    PadhdisplaydevichealthvervosecpupredictiongridComponent,
    PadhdisplaydevicehealthpredictionComponent,
    PadhdisplaydevicehealthpredictiondetailComponent,
    PadhdisplaydevicehealthpredictiongridComponent,
    OnDemandExecutionDfSessionComponent,
    PadhdisplaydevicepicstatuspredictionComponent,
    PadhdisplaydevicepredComponent,
    TrafficpathanalysisComponent,
    TrafficpathanalysisdetailComponent,
    TrafficpathanalysisgridComponent,
    OnDemandTrafficPathAnalysisComponent,
    LdsettlementincidentComponent,
    LdsettlementincidentdetailComponent,
    LdsettlementincidentgridComponent,
    LdsettlementsitedownComponent,
    LdsettlementsitedowndetailComponent,
    LdsettlementsitedowngridComponent,
    LdsettlementdclowComponent,
    LdsettlementdclowdetailComponent,
    LdsettlementdclowgridComponent,
    LdsettlementpgComponent,
    LdsettlementpgdetailComponent,
    LdsettlementpggridComponent,
    LdsettlementmainsfailureComponent,
    LdsettlementmainsfailuredetailComponent,
    LdsettlementmainsfailuregridComponent,
    LdsettlementgensetonloadreportComponent,
    LdsettlementgensetonloadreportdetailComponent,
    LdsettlementgensetonloadreportgridComponent,
    LdsettlementsiteavailabilityComponent,
    LdsettlementsiteavailabilitydetailComponent,
    LdsettlementsiteavailabilitygridComponent,
    LdsettlementexternalalarmComponent,
    LdsettlementexternalalarmdetailComponent,
    LdsettlementexternalalarmgridComponent,
    TrafficpathkpireportComponent,
    TrafficpathkpireportdetailComponent,
    TrafficpathkpireportgridComponent,
    Performancedatau2000ipComponent,
    Performancedatau2000ipdetailComponent,
    Performancedatau2000ipgridComponent,
    PendingunusedfirewallruleComponent,
    PendingunusedfirewallruledetailComponent,
    PendingunusedfirewallrulegridComponent,
    LdsettlementdecisionComponent,
    LdsettlementdecisiondetailComponent,
    LdsettlementdecisiongridComponent,
    LdsettlementdecisiongridComponent,
    SitewisedcavailabilityandldvalueComponent,
    SitewisedcavailabilityandldvaluedetailComponent,
    SitewisedcavailabilityandldvaluegridComponent,
    SemalarmdataComponent,
    SemalarmdatadetailComponent,
    SemalarmdatagridComponent,
    LinkfromdigitouchComponent,
    LinkfromdigitouchdetailComponent,
    LinkfromdigitouchgridComponent,
    LdsettlementsiteprioritykpiComponent,
    LdsettlementsiteprioritykpidetailComponent,
    LdsettlementsiteprioritykpigridComponent,
    LdsettlementldcalculationComponent,
    LdsettlementldcalculationdetailComponent,
    LdsettlementldcalculationgridComponent,
    AlarmnameComponent,
    AlarmnamedetailComponent,
    AlarmnamegridComponent,
    AlarmchildComponent,
    AlarmchilddetailComponent,
    AlarmchildgridComponent,
    AlarmoduslotmappingComponent,
    AlarmoduslotmappingdetailComponent,
    AlarmoduslotmappinggridComponent,
    LdsettlementDashboardComponent,
    TroubleticketComponent,
    TroubleticketdetailComponent,
    TroubleticketgridComponent,
    MwalarmdashboardComponent,
    MwalarmdashboarddetailComponent,
    MwalarmdashboardgridComponent,
    DcpowerrequesttypeComponent,
    DcpowerrequesttypedetailComponent,
    DcpowerrequesttypegridComponent,
    DcpowerrequestdevicetypeComponent,
    DcpowerrequestdevicetypedetailComponent,
    DcpowerrequestdevicetypegridComponent,
    RocComponent,
    RocdetailComponent,
    RocgridComponent,
    LocationhierarchyossComponent,
    LocationhierarchyossdetailComponent,
    LocationhierarchyossgridComponent,
    ChartconfigurationComponent,
    ChartconfigurationdetailComponent,
    ChartconfigurationgridComponent,
    TicketassignedgroupComponent,
    TicketassignedgroupdetailComponent,
    TicketassignedgroupgridComponent,
    EricssonrslComponent,
    EricssonrsldetailComponent,
    EricssonrslgridComponent,
    EricssontslComponent,
    EricssontsldetailComponent,
    EricssontslgridComponent,
    HuaweirsltslComponent,
    HuaweirsltsldetailComponent,
    HuaweirsltslgridComponent,
    SoemconfigdataminlinktnethComponent,
    SoemconfigdataminlinktnethdetailComponent,
    SoemconfigdataminlinktnethgridComponent,
    MwutilizationdashboardComponent,
    MwutilizationdashboarddetailComponent,
    MwutilizationdashboardgridComponent,
    UtilisationericssonlanComponent,
    UtilisationericssonlandetailComponent,
    UtilisationericssonlangridComponent,
    UtilisationericssonwanComponent,
    UtilisationericssonwandetailComponent,
    UtilisationericssonwangridComponent,
    MwrsltsldashboardComponent,
    MwrsltsldashboarddetailComponent,
    MwrsltsldashboardgridComponent,
    TicketingfilterComponent,
    TicketingfilterdetailComponent,
    TicketingfiltergridComponent,
    DashboardconfigurationforrsltslComponent,
    DashboardconfigurationforrsltsldetailComponent,
    DashboardconfigurationforrsltslgridComponent,
    ConfigurablecategoryComponent,
    ConfigurablecategorydetailComponent,
    ConfigurablecategorygridComponent,
    MicrowavelinkreportComponent,
    MicrowavelinkreportdetailComponent,
    MicrowavelinkreportgridComponent,
    HuaweiportutilizationComponent,
    HuaweiportutilizationdetailComponent,
    HuaweiportutilizationgridComponent,
    RsltslvariationComponent,
    RsltslvariationdetailComponent,
    RsltslvariationgridComponent,
    MwadaptivemodulationdashboardComponent,
    MwadaptivemodulationdashboarddetailComponent,
    MwadaptivemodulationdashboardgridComponent,
    AdaptivemodulationdashboardconfigurationComponent,
    AdaptivemodulationdashboardconfigurationdetailComponent,
    AdaptivemodulationdashboardconfigurationgridComponent,
    LicensingdashboardconfigurationComponent,
    LicensingdashboardconfigurationdetailComponent,
    LicensingdashboardconfigurationgridComponent,
    LicensingdashboardComponent,
    LicensingdashboarddetailComponent,
    LicensingdashboardgridComponent,
    UniquelinktableforsltslComponent,
    UniquelinktableforsltsldetailComponent,
    UniquelinktableforsltslgridComponent,
    UniquelinktableforutilizationComponent,
    UniquelinktableforutilizationdetailComponent,
    UniquelinktableforutilizationgridComponent,
    CustomerinsightavailabiltyComponent,
    CustomerinsightavailabiltydetailComponent,
    CustomerinsightavailabiltygridComponent,
    FileDropComponent,
    UniqueinterfacetableforutilizationComponent,
    UniqueinterfacetableforutilizationdetailComponent,
    UniqueinterfacetableforutilizationgridComponent,
    UtilizationdashboardconfigurationComponent,
    UtilizationdashboardconfigurationdetailComponent,
    UtilizationdashboardconfigurationgridComponent,
    EricssonmodulationComponent,
    EricssonmodulationdetailComponent,
	  EricssonmodulationgridComponent,
    MwdcndashboardComponent,
    MwdcndashboarddetailComponent,
    MwdcndashboardgridComponent,
    MwdcndashboardconfigurationComponent,
    MwdcndashboardconfigurationdetailComponent,
    MwdcndashboardconfigurationgridComponent,
    UnusedandmostusedrulereportComponent,
    DenyhitipreportComponent,
    UniquelinktableforadaptivemodulationComponent,
    UniquelinktableforadaptivemodulationdetailComponent,
    UniquelinktableforadaptivemodulationgridComponent,
    InformationrepositoryComponent,
    InformationrepositorydetailComponent,
	InformationrepositorygridComponent,
    EricssonlicensefalmoduleinventoryComponent,
    EricssonlicensefalmoduleinventorydetailComponent,
    EricssonlicensefalmoduleinventorygridComponent,
    EricssonlicensemoduleinventoryComponent,
    EricssonlicensemoduleinventorydetailComponent,
    EricssonlicensemoduleinventorygridComponent,
    QosradioqualityericssonComponent,
    QosradioqualityericssondetailComponent,
    QosradioqualityericssongridComponent,
    MwqosdashboardconfigurationComponent,
    MwqosdashboardconfigurationdetailComponent,
    MwqosdashboardconfigurationgridComponent,
    MwqosdashboardComponent,
    MwqosdashboarddetailComponent,
    MwqosdashboardgridComponent,
    ServerhealthcheckinventoryComponent,
    ServerhealthcheckinventorydetailComponent,
    ServerhealthcheckinventorygridComponent,
    HuaweilicenseComponent,
    HuaweilicensedetailComponent,
    HuaweilicensegridComponent,
    DcnericssonalarmComponent,
    DcnericssonalarmdetailComponent,

	DcnericssonalarmgridComponent,
	BackupnodeComponent,
    BackupnodedetailComponent,
	BackupnodegridComponent,
	BackuphistoryComponent,
    BackuphistorydetailComponent,
	BackuphistorygridComponent,
	BackuppolicyComponent,
    BackuppolicydetailComponent,
	BackuppolicygridComponent,
	BackupcalendarComponent,
    BackupcalendardetailComponent,
	BackupcalendargridComponent,

    DcnericssonalarmgridComponent,
    LicensinghuaweidashboardComponent,
    LicensinghuaweidashboarddetailComponent,
    LicensinghuaweidashboardgridComponent,
    LicensingreportComponent,
    LicensingreportdetailComponent,
    LicensingreportgridComponent,

    QosconfigurationstandardComponent,
    QosconfigurationstandarddetailComponent,
    QosconfigurationstandardgridComponent,
    UserprioritymappingconfigurationvalueComponent,
    UserprioritymappingconfigurationvaluedetailComponent,
    UserprioritymappingconfigurationvaluegridComponent,
    HuaweiqosComponent,
    HuaweiqosdetailComponent,
  	HuaweiqosgridComponent,
    
    ServerhealthreportComponent,
    ServerhealthreportdetailComponent,
    ServerhealthreportgridComponent,
    
    QosericssontnethComponent,
    QosericssontnethdetailComponent,
    QosericssontnethgridComponent,
    
    MwserviceqosdashboardComponent,
    MwserviceqosdashboarddetailComponent,
    MwserviceqosdashboardgridComponent,
    MwserviceqosdashboardconfigurationComponent,
    MwserviceqosdashboardconfigurationdetailComponent,
    MwserviceqosdashboardconfigurationgridComponent,
    
    EmsfiledirectoryrepositoryComponent,
    EmsfiledirectoryrepositorydetailComponent,
    EmsfiledirectoryrepositorygridComponent,
    
    OnDemandHealthCheckComponent,
    EmsfileavailabilityreportComponent,
    EmsfileavailabilityreportdetailComponent,
    EmsfileavailabilityreportgridComponent,
    
    OnDemandEmsFileDirectoryCheckComponent,

    QosericssonconfigurationdataComponent,
    QosericssonconfigurationdatadetailComponent,
    QosericssonconfigurationdatagridComponent,
    
    SoemneinventoryComponent,
    SoemneinventorydetailComponent,
    SoemneinventorygridComponent,
    HuaweiinterfaceportreportComponent,
    HuaweiinterfaceportreportdetailComponent,
    HuaweiinterfaceportreportgridComponent,
    DatascriptsstoryComponent,
    DatascriptsstorydetailComponent,
    DatascriptsstorygridComponent,
    ComprehensivedashboardconfigurationComponent,
    ComprehensivedashboardconfigurationdetailComponent,
	 ComprehensivedashboardconfigurationgridComponent,
    ComprehensivedashboardComponent,
    ComprehensivedashboarddetailComponent,
    ComprehensivedashboardgridComponent,
    DcpowerbulkrequestComponent,
    DcpowerbulkrequestdetailComponent,
	  DcpowerbulkrequestgridComponent

  ],
  providers: [AlertService, UserSessionService],
})
export class HomeModule {}
