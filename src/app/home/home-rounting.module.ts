import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { UserComponent } from '../user/user.component';
import { UserdetailComponent } from '../user/detail/userdetail.component';

import { RoleComponent } from '../role/role.component';
import { RoledetailComponent } from '../role/detail/roledetail.component';

import { FunctioncodeComponent } from '../functioncode/functioncode.component';
import { FunctioncodedetailComponent } from '../functioncode/detail/functioncodedetail.component';

import { UserroleComponent } from '../userrole/userrole.component';
import { RolefeatureComponent } from '../rolefeature/rolefeature.component';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { FileuploadComponent } from '../fileupload/fileupload.component';
import { FileuploaddetailComponent } from '../fileupload/detail/fileuploaddetail.component';
import { AudittrailComponent } from '../audittrail/audittrail.component';
import { AudittraildetailComponent } from '../audittrail/detail/audittraildetail.component';
import { SampledashboardComponent } from '../sampledashboard/sampledashboard.component';
import { SampledashboarddetailComponent } from '../sampledashboard/detail/sampledashboarddetail.component';
import { AutomationitemComponent } from '../automationitem/automationitem.component';
import { AutomationitemdetailComponent } from '../automationitem/detail/automationitemdetail.component';
import { AutomationwiseschedulerconfigurationComponent } from '../automationwiseschedulerconfiguration/automationwiseschedulerconfiguration.component';
import { AutomationwiseschedulerconfigurationdetailComponent } from '../automationwiseschedulerconfiguration/detail/automationwiseschedulerconfigurationdetail.component';
import { PadhdisplaydevicepicstatusComponent } from '../padhdisplaydevicepicstatus/padhdisplaydevicepicstatus.component';
import { PadhdisplaydevicepicstatusdetailComponent } from '../padhdisplaydevicepicstatus/detail/padhdisplaydevicepicstatusdetail.component';
import { MpbnassetinventoryComponent } from '../mpbnassetinventory/mpbnassetinventory.component';
import { MpbnassetinventorydetailComponent } from '../mpbnassetinventory/detail/mpbnassetinventorydetail.component';
import { PadhdisplaydeviceComponent } from '../padhdisplaydevice/padhdisplaydevice.component';
import { PadhdisplaydevicedetailComponent } from '../padhdisplaydevice/detail/padhdisplaydevicedetail.component';
import { PadhdisplayhealthverboseComponent } from '../padhdisplayhealthverbose/padhdisplayhealthverbose.component';
import { PadhdisplayhealthverbosedetailComponent } from '../padhdisplayhealthverbose/detail/padhdisplayhealthverbosedetail.component';
import { OnDemandExecutionDisplayDeviceComponent } from '../onDemandExecution/on-demand-execution-display-device/on-demand-execution-display-device.component';

import { FsadisplaysecuritypolicyruleallComponent } from '../fsadisplaysecuritypolicyruleall/fsadisplaysecuritypolicyruleall.component';
import { FsadisplaysecuritypolicyrulealldetailComponent } from '../fsadisplaysecuritypolicyruleall/detail/fsadisplaysecuritypolicyrulealldetail.component';
import { FsadisplayfirewallsessionComponent } from '../fsadisplayfirewallsession/fsadisplayfirewallsession.component';
import { FsadisplayfirewallsessiondetailComponent } from '../fsadisplayfirewallsession/detail/fsadisplayfirewallsessiondetail.component';
import { AutomationschedulerComponent } from '../automationscheduler/automationscheduler.component';
import { AutomationschedulerdetailComponent } from '../automationscheduler/detail/automationschedulerdetail.component';
import { WarrantysupportclaimComponent } from '../warrantysupportclaim/warrantysupportclaim.component';
import { WarrantysupportclaimdetailComponent } from '../warrantysupportclaim/detail/warrantysupportclaimdetail.component';
import { OnDemandExcutionDdpicstatusComponent } from '../onDemandExecution/on-demand-excution-ddpicstatus/on-demand-excution-ddpicstatus.component';
import { OnDemandExecutionDspruleallComponent } from '../onDemandExecution/on-demand-execution-dspruleall/on-demand-execution-dspruleall.component';
import { DcpowermanagementComponent } from '../dcpowermanagement/dcpowermanagement.component';
import { DcpowermanagementdetailComponent } from '../dcpowermanagement/detail/dcpowermanagementdetail.component';
import {  OnDemandDisplayHealthVerboseComponent } from '../onDemandExecution/on-demand-display-health-verbose/on-demand-display-health-verbose.component';
import { DcpoweractivitywiseslaComponent } from '../dcpoweractivitywisesla/dcpoweractivitywisesla.component';
import { DcpoweractivitywisesladetailComponent } from '../dcpoweractivitywisesla/detail/dcpoweractivitywisesladetail.component';
import { DcpoweritemwisewarrantyComponent } from '../dcpoweritemwisewarranty/dcpoweritemwisewarranty.component';
import { DcpoweritemwisewarrantydetailComponent } from '../dcpoweritemwisewarranty/detail/dcpoweritemwisewarrantydetail.component';
import { DcpowervendorComponent } from '../dcpowervendor/dcpowervendor.component';
import { DcpowervendordetailComponent } from '../dcpowervendor/detail/dcpowervendordetail.component';
import { DcpowersitelistComponent } from '../dcpowersitelist/dcpowersitelist.component';
import { DcpowersitelistdetailComponent } from '../dcpowersitelist/detail/dcpowersitelistdetail.component';
import { SchedulestatusComponent } from '../schedulestatus/schedulestatus.component';
import { SchedulestatusdetailComponent } from '../schedulestatus/detail/schedulestatusdetail.component';

import { PadhdisplaydevicepredgridComponent } from '../padhdisplaydevicepred/grid/padhdisplaydevicepredgrid.component';
import { PadhhealthverbosepredgridComponent } from '../padhhealthverbosepred/grid/padhhealthverbosepredgrid.component';
import { PadhdisplaydevicepicstatuspredictiongridComponent } from '../padhdisplaydevicepicstatusprediction/grid/padhdisplaydevicepicstatuspredictiongrid.component';
import { PadhdisplaydevichealthvervosecpupredictiongridComponent } from '../padhdisplaydevichealthvervosecpuprediction/grid/padhdisplaydevichealthvervosecpupredictiongrid.component';
import { PadhdisplaydevicehealthpredictiongridComponent } from '../padhdisplaydevicehealthprediction/grid/padhdisplaydevicehealthpredictiongrid.component';
import {  OnDemandExecutionDfSessionComponent } from '../onDemandExecution/on-demand-execution-df-session/on-demand-execution-df-session.component';
import { TrafficpathanalysisComponent } from '../trafficpathanalysis/trafficpathanalysis.component';
import { TrafficpathanalysisdetailComponent } from '../trafficpathanalysis/detail/trafficpathanalysisdetail.component';
import { OnDemandTrafficPathAnalysisComponent } from '../onDemandExecution/on-demand-traffic-path-analysis/on-demand-traffic-path-analysis.component';
import { LdsettlementincidentComponent } from '../ldsettlementincident/ldsettlementincident.component';
import { LdsettlementincidentdetailComponent } from '../ldsettlementincident/detail/ldsettlementincidentdetail.component';
import { LdsettlementsitedownComponent } from '../ldsettlementsitedown/ldsettlementsitedown.component';
import { LdsettlementsitedowndetailComponent } from '../ldsettlementsitedown/detail/ldsettlementsitedowndetail.component';
import { Performancedatau2000ipComponent } from '../performancedatau2000ip/performancedatau2000ip.component';
import { Performancedatau2000ipdetailComponent } from '../performancedatau2000ip/detail/performancedatau2000ipdetail.component';


import { LdsettlementdclowComponent } from '../ldsettlementdclow/ldsettlementdclow.component';
import { LdsettlementdclowdetailComponent } from '../ldsettlementdclow/detail/ldsettlementdclowdetail.component';
import { LdsettlementpgComponent } from '../ldsettlementpg/ldsettlementpg.component';
import { LdsettlementpgdetailComponent } from '../ldsettlementpg/detail/ldsettlementpgdetail.component';
import { LdsettlementmainsfailureComponent } from '../ldsettlementmainsfailure/ldsettlementmainsfailure.component';
import { LdsettlementmainsfailuredetailComponent } from '../ldsettlementmainsfailure/detail/ldsettlementmainsfailuredetail.component';
import { LdsettlementgensetonloadreportComponent } from '../ldsettlementgensetonloadreport/ldsettlementgensetonloadreport.component';
import { LdsettlementgensetonloadreportdetailComponent } from '../ldsettlementgensetonloadreport/detail/ldsettlementgensetonloadreportdetail.component';
import { LdsettlementsiteavailabilityComponent } from '../ldsettlementsiteavailability/ldsettlementsiteavailability.component';
import { LdsettlementsiteavailabilitydetailComponent } from '../ldsettlementsiteavailability/detail/ldsettlementsiteavailabilitydetail.component';
import { LdsettlementexternalalarmComponent } from '../ldsettlementexternalalarm/ldsettlementexternalalarm.component';
import { LdsettlementexternalalarmdetailComponent } from '../ldsettlementexternalalarm/detail/ldsettlementexternalalarmdetail.component';
import { TrafficpathkpireportComponent } from '../trafficpathkpireport/trafficpathkpireport.component';
import { TrafficpathkpireportdetailComponent } from '../trafficpathkpireport/detail/trafficpathkpireportdetail.component';
import { PendingunusedfirewallruleComponent } from '../pendingunusedfirewallrule/pendingunusedfirewallrule.component';
import { PendingunusedfirewallruledetailComponent } from '../pendingunusedfirewallrule/detail/pendingunusedfirewallruledetail.component';
import { LdsettlementdecisionComponent } from '../ldsettlementdecision/ldsettlementdecision.component';
import { LdsettlementdecisiondetailComponent } from '../ldsettlementdecision/detail/ldsettlementdecisiondetail.component';
import { SitewisedcavailabilityandldvalueComponent } from '../sitewisedcavailabilityandldvalue/sitewisedcavailabilityandldvalue.component';
import { SitewisedcavailabilityandldvaluedetailComponent } from '../sitewisedcavailabilityandldvalue/detail/sitewisedcavailabilityandldvaluedetail.component';
import { SemalarmdataComponent } from '../semalarmdata/semalarmdata.component';
import { SemalarmdatadetailComponent } from '../semalarmdata/detail/semalarmdatadetail.component';
import { LinkfromdigitouchComponent } from '../linkfromdigitouch/linkfromdigitouch.component';
import { LinkfromdigitouchdetailComponent } from '../linkfromdigitouch/detail/linkfromdigitouchdetail.component';
import { LdsettlementsiteprioritykpiComponent } from '../ldsettlementsiteprioritykpi/ldsettlementsiteprioritykpi.component';
import { LdsettlementsiteprioritykpidetailComponent } from '../ldsettlementsiteprioritykpi/detail/ldsettlementsiteprioritykpidetail.component';
import { LdsettlementldcalculationComponent } from '../ldsettlementldcalculation/ldsettlementldcalculation.component';
import { LdsettlementldcalculationdetailComponent } from '../ldsettlementldcalculation/detail/ldsettlementldcalculationdetail.component';
import { AlarmnameComponent } from '../alarmname/alarmname.component';
import { AlarmnamedetailComponent } from '../alarmname/detail/alarmnamedetail.component';
import { AlarmchildComponent } from '../alarmchild/alarmchild.component';
import { AlarmchilddetailComponent } from '../alarmchild/detail/alarmchilddetail.component';
import { AlarmoduslotmappingComponent } from '../alarmoduslotmapping/alarmoduslotmapping.component';
import { AlarmoduslotmappingdetailComponent } from '../alarmoduslotmapping/detail/alarmoduslotmappingdetail.component';
import { LdsettlementDashboardComponent } from '../LDSettlementDashboard/ldsettlement-dashboard/ldsettlement-dashboard.component';
import { TroubleticketComponent } from '../troubleticket/troubleticket.component';
import { TroubleticketdetailComponent } from '../troubleticket/detail/troubleticketdetail.component';
import { MwalarmdashboardComponent } from '../mwalarmdashboard/mwalarmdashboard.component';
import { MwalarmdashboarddetailComponent } from '../mwalarmdashboard/detail/mwalarmdashboarddetail.component';
import { DcpowerrequesttypeComponent } from '../dcpowerrequesttype/dcpowerrequesttype.component';
import { DcpowerrequesttypedetailComponent } from '../dcpowerrequesttype/detail/dcpowerrequesttypedetail.component';
import { DcpowerrequestdevicetypeComponent } from '../dcpowerrequestdevicetype/dcpowerrequestdevicetype.component';
import { DcpowerrequestdevicetypedetailComponent } from '../dcpowerrequestdevicetype/detail/dcpowerrequestdevicetypedetail.component';
import { RocComponent } from '../roc/roc.component';
import { RocdetailComponent } from '../roc/detail/rocdetail.component';
import { LocationhierarchyossComponent } from '../locationhierarchyoss/locationhierarchyoss.component';
import { LocationhierarchyossdetailComponent } from '../locationhierarchyoss/detail/locationhierarchyossdetail.component';
import { ChartconfigurationComponent } from '../chartconfiguration/chartconfiguration.component';
import { ChartconfigurationdetailComponent } from '../chartconfiguration/detail/chartconfigurationdetail.component';
import { TicketassignedgroupComponent } from '../ticketassignedgroup/ticketassignedgroup.component';
import { TicketassignedgroupdetailComponent } from '../ticketassignedgroup/detail/ticketassignedgroupdetail.component';
import { EricssonrslComponent } from '../ericssonrsl/ericssonrsl.component';
import { EricssonrsldetailComponent } from '../ericssonrsl/detail/ericssonrsldetail.component';
import { EricssontslComponent } from '../ericssontsl/ericssontsl.component';
import { EricssontsldetailComponent } from '../ericssontsl/detail/ericssontsldetail.component';
import { HuaweirsltslComponent } from '../huaweirsltsl/huaweirsltsl.component';
import { HuaweirsltsldetailComponent } from '../huaweirsltsl/detail/huaweirsltsldetail.component';
import { SoemconfigdataminlinktnethComponent } from '../soemconfigdataminlinktneth/soemconfigdataminlinktneth.component';
import { SoemconfigdataminlinktnethdetailComponent } from '../soemconfigdataminlinktneth/detail/soemconfigdataminlinktnethdetail.component';
import { MwutilizationdashboardComponent } from '../mwutilizationdashboard/mwutilizationdashboard.component';
import { MwutilizationdashboarddetailComponent } from '../mwutilizationdashboard/detail/mwutilizationdashboarddetail.component';
import { UtilisationericssonlanComponent } from '../utilisationericssonlan/utilisationericssonlan.component';
import { UtilisationericssonlandetailComponent } from '../utilisationericssonlan/detail/utilisationericssonlandetail.component';
import { UtilisationericssonwanComponent } from '../utilisationericssonwan/utilisationericssonwan.component';
import { UtilisationericssonwandetailComponent } from '../utilisationericssonwan/detail/utilisationericssonwandetail.component';
import { MwrsltsldashboardComponent } from '../mwrsltsldashboard/mwrsltsldashboard.component';
import { MwrsltsldashboarddetailComponent } from '../mwrsltsldashboard/detail/mwrsltsldashboarddetail.component';
import { TicketingfilterComponent } from '../ticketingfilter/ticketingfilter.component';
import { TicketingfilterdetailComponent } from '../ticketingfilter/detail/ticketingfilterdetail.component';
import { DashboardconfigurationforrsltslComponent } from '../dashboardconfigurationforrsltsl/dashboardconfigurationforrsltsl.component';
import { DashboardconfigurationforrsltsldetailComponent } from '../dashboardconfigurationforrsltsl/detail/dashboardconfigurationforrsltsldetail.component';
import { ConfigurablecategoryComponent } from '../configurablecategory/configurablecategory.component';
import { ConfigurablecategorydetailComponent } from '../configurablecategory/detail/configurablecategorydetail.component';
import { MicrowavelinkreportComponent } from '../microwavelinkreport/microwavelinkreport.component';
import { MicrowavelinkreportdetailComponent } from '../microwavelinkreport/detail/microwavelinkreportdetail.component';
import { HuaweiportutilizationComponent } from '../huaweiportutilization/huaweiportutilization.component';
import { HuaweiportutilizationdetailComponent } from '../huaweiportutilization/detail/huaweiportutilizationdetail.component';

import { RsltslvariationComponent } from '../rsltslvariation/rsltslvariation.component';
import { RsltslvariationdetailComponent } from '../rsltslvariation/detail/rsltslvariationdetail.component';
import { MwadaptivemodulationdashboardComponent } from '../mwadaptivemodulationdashboard/mwadaptivemodulationdashboard.component';
import { MwadaptivemodulationdashboarddetailComponent } from '../mwadaptivemodulationdashboard/detail/mwadaptivemodulationdashboarddetail.component';
import { AdaptivemodulationdashboardconfigurationComponent } from '../adaptivemodulationdashboardconfiguration/adaptivemodulationdashboardconfiguration.component';
import { AdaptivemodulationdashboardconfigurationdetailComponent } from '../adaptivemodulationdashboardconfiguration/detail/adaptivemodulationdashboardconfigurationdetail.component';
import { LicensingdashboardconfigurationComponent } from '../licensingdashboardconfiguration/licensingdashboardconfiguration.component';
import { LicensingdashboardconfigurationdetailComponent } from '../licensingdashboardconfiguration/detail/licensingdashboardconfigurationdetail.component';
import { LicensingdashboardComponent } from '../licensingdashboard/licensingdashboard.component';
import { LicensingdashboarddetailComponent } from '../licensingdashboard/detail/licensingdashboarddetail.component';
import { UniquelinktableforsltslComponent } from '../uniquelinktableforsltsl/uniquelinktableforsltsl.component';
import { UniquelinktableforsltsldetailComponent } from '../uniquelinktableforsltsl/detail/uniquelinktableforsltsldetail.component';
import { UniquelinktableforutilizationComponent } from '../uniquelinktableforutilization/uniquelinktableforutilization.component';
import { UniquelinktableforutilizationdetailComponent } from '../uniquelinktableforutilization/detail/uniquelinktableforutilizationdetail.component';
import { UniqueinterfacetableforutilizationComponent } from '../uniqueinterfacetableforutilization/uniqueinterfacetableforutilization.component';
import { UniqueinterfacetableforutilizationdetailComponent } from '../uniqueinterfacetableforutilization/detail/uniqueinterfacetableforutilizationdetail.component';

import { CustomerinsightavailabiltyComponent } from '../customerinsightavailabilty/customerinsightavailabilty.component';
import { CustomerinsightavailabiltydetailComponent } from '../customerinsightavailabilty/detail/customerinsightavailabiltydetail.component';
import { UtilizationdashboardconfigurationComponent } from '../utilizationdashboardconfiguration/utilizationdashboardconfiguration.component';
import { UtilizationdashboardconfigurationdetailComponent } from '../utilizationdashboardconfiguration/detail/utilizationdashboardconfigurationdetail.component';
import { EricssonmodulationComponent } from '../ericssonmodulation/ericssonmodulation.component';
import { EricssonmodulationdetailComponent } from '../ericssonmodulation/detail/ericssonmodulationdetail.component';


import { MwdcndashboardComponent } from '../mwdcndashboard/mwdcndashboard.component';
import { MwdcndashboarddetailComponent } from '../mwdcndashboard/detail/mwdcndashboarddetail.component';
import { MwdcndashboardconfigurationComponent } from '../mwdcndashboardconfiguration/mwdcndashboardconfiguration.component';
import { MwdcndashboardconfigurationdetailComponent } from '../mwdcndashboardconfiguration/detail/mwdcndashboardconfigurationdetail.component';
import { UnusedandmostusedrulereportComponent } from '../unusedandmostusedrulereport/component/unusedandmostusedrulereport/unusedandmostusedrulereport.component';
import { DenyhitipreportComponent } from '../denyhitipreport/component/denyhitipreport/denyhitipreport.component';
import { UniquelinktableforadaptivemodulationComponent } from '../uniquelinktableforadaptivemodulation/uniquelinktableforadaptivemodulation.component';
import { UniquelinktableforadaptivemodulationdetailComponent } from '../uniquelinktableforadaptivemodulation/detail/uniquelinktableforadaptivemodulationdetail.component';
import { InformationrepositoryComponent } from '../informationrepository/informationrepository.component';
import { InformationrepositorydetailComponent } from '../informationrepository/detail/informationrepositorydetail.component';
import { EricssonlicensefalmoduleinventoryComponent } from '../ericssonlicensefalmoduleinventory/ericssonlicensefalmoduleinventory.component';
import { EricssonlicensefalmoduleinventorydetailComponent } from '../ericssonlicensefalmoduleinventory/detail/ericssonlicensefalmoduleinventorydetail.component';
import { EricssonlicensemoduleinventoryComponent } from '../ericssonlicensemoduleinventory/ericssonlicensemoduleinventory.component';
import { EricssonlicensemoduleinventorydetailComponent } from '../ericssonlicensemoduleinventory/detail/ericssonlicensemoduleinventorydetail.component';
import { QosradioqualityericssonComponent } from '../qosradioqualityericsson/qosradioqualityericsson.component';
import { QosradioqualityericssondetailComponent } from '../qosradioqualityericsson/detail/qosradioqualityericssondetail.component';
import { MwqosdashboardconfigurationComponent } from '../mwqosdashboardconfiguration/mwqosdashboardconfiguration.component';
import { MwqosdashboardconfigurationdetailComponent } from '../mwqosdashboardconfiguration/detail/mwqosdashboardconfigurationdetail.component';
import { MwqosdashboardComponent } from '../mwqosdashboard/mwqosdashboard.component';
import { MwqosdashboarddetailComponent } from '../mwqosdashboard/detail/mwqosdashboarddetail.component';
import { ServerhealthcheckinventoryComponent } from '../serverhealthcheckinventory/serverhealthcheckinventory.component';
import { ServerhealthcheckinventorydetailComponent } from '../serverhealthcheckinventory/detail/serverhealthcheckinventorydetail.component';
import { HuaweilicenseComponent } from '../huaweilicense/huaweilicense.component';
import { HuaweilicensedetailComponent } from '../huaweilicense/detail/huaweilicensedetail.component';
import { DcnericssonalarmComponent } from '../dcnericssonalarm/dcnericssonalarm.component';
import { DcnericssonalarmdetailComponent } from '../dcnericssonalarm/detail/dcnericssonalarmdetail.component';

import { BackupnodeComponent } from '../backupnode/backupnode.component';
import { BackupnodedetailComponent } from '../backupnode/detail/backupnodedetail.component';
import { BackuphistoryComponent } from '../backuphistory/backuphistory.component';
import { BackuphistorydetailComponent } from '../backuphistory/detail/backuphistorydetail.component';
import { BackuppolicyComponent } from '../backuppolicy/backuppolicy.component';
import { BackuppolicydetailComponent } from '../backuppolicy/detail/backuppolicydetail.component';
import { BackupcalendarComponent } from '../backupcalendar/backupcalendar.component';
import { BackupcalendardetailComponent } from '../backupcalendar/detail/backupcalendardetail.component';

import { LicensinghuaweidashboardComponent } from '../licensinghuaweidashboard/licensinghuaweidashboard.component';
import { LicensinghuaweidashboarddetailComponent } from '../licensinghuaweidashboard/detail/licensinghuaweidashboarddetail.component';
import { LicensingreportComponent } from '../licensingreport/licensingreport.component';
import { LicensingreportdetailComponent } from '../licensingreport/detail/licensingreportdetail.component';

import { QosconfigurationstandardComponent } from '../qosconfigurationstandard/qosconfigurationstandard.component';
import { QosconfigurationstandarddetailComponent } from '../qosconfigurationstandard/detail/qosconfigurationstandarddetail.component';
import { UserprioritymappingconfigurationvalueComponent } from '../userprioritymappingconfigurationvalue/userprioritymappingconfigurationvalue.component';
import { UserprioritymappingconfigurationvaluedetailComponent } from '../userprioritymappingconfigurationvalue/detail/userprioritymappingconfigurationvaluedetail.component';
import { HuaweiqosComponent } from '../huaweiqos/huaweiqos.component';
import { HuaweiqosdetailComponent } from '../huaweiqos/detail/huaweiqosdetail.component';

import { ServerhealthreportComponent } from '../serverhealthreport/serverhealthreport.component';
import { ServerhealthreportdetailComponent } from '../serverhealthreport/detail/serverhealthreportdetail.component';

import { QosericssontnethComponent } from '../qosericssontneth/qosericssontneth.component';
import { QosericssontnethdetailComponent } from '../qosericssontneth/detail/qosericssontnethdetail.component';

import { MwserviceqosdashboardComponent } from '../mwserviceqosdashboard/mwserviceqosdashboard.component';
import { MwserviceqosdashboarddetailComponent } from '../mwserviceqosdashboard/detail/mwserviceqosdashboarddetail.component';

import { MwserviceqosdashboardconfigurationComponent } from '../mwserviceqosdashboardconfiguration/mwserviceqosdashboardconfiguration.component';
import { MwserviceqosdashboardconfigurationdetailComponent } from '../mwserviceqosdashboardconfiguration/detail/mwserviceqosdashboardconfigurationdetail.component';

import { EmsfiledirectoryrepositoryComponent } from '../emsfiledirectoryrepository/emsfiledirectoryrepository.component';
import { EmsfiledirectoryrepositorydetailComponent } from '../emsfiledirectoryrepository/detail/emsfiledirectoryrepositorydetail.component';

import { OnDemandHealthCheckComponent } from '../onDemandHealthCheck/on-demand-health-check/on-demand-health-check.component';

import { EmsfileavailabilityreportComponent } from '../emsfileavailabilityreport/emsfileavailabilityreport.component';
import { EmsfileavailabilityreportdetailComponent } from '../emsfileavailabilityreport/detail/emsfileavailabilityreportdetail.component';
import { OnDemandEmsFileDirectoryCheckComponent } from '../onDemandEmsFileDirectoryCheck/on-demand-ems-file-directory-check/on-demand-ems-file-directory-check.component';

import { QosericssonconfigurationdataComponent } from '../qosericssonconfigurationdata/qosericssonconfigurationdata.component';
import { QosericssonconfigurationdatadetailComponent } from '../qosericssonconfigurationdata/detail/qosericssonconfigurationdatadetail.component';

import { SoemneinventoryComponent } from '../soemneinventory/soemneinventory.component';
import { SoemneinventorydetailComponent } from '../soemneinventory/detail/soemneinventorydetail.component';
import { HuaweiinterfaceportreportComponent } from '../huaweiinterfaceportreport/huaweiinterfaceportreport.component';
import { HuaweiinterfaceportreportdetailComponent } from '../huaweiinterfaceportreport/detail/huaweiinterfaceportreportdetail.component';

import { DatascriptsstoryComponent } from '../datascriptsstory/datascriptsstory.component';
import { DatascriptsstorydetailComponent } from '../datascriptsstory/detail/datascriptsstorydetail.component';
import { ComprehensivedashboardconfigurationComponent } from '../comprehensivedashboardconfiguration/comprehensivedashboardconfiguration.component';
import { ComprehensivedashboardconfigurationdetailComponent } from '../comprehensivedashboardconfiguration/detail/comprehensivedashboardconfigurationdetail.component';
import { ComprehensivedashboardComponent } from '../comprehensivedashboard/comprehensivedashboard.component';
import { ComprehensivedashboarddetailComponent } from '../comprehensivedashboard/detail/comprehensivedashboarddetail.component';
import { DcpowerbulkrequestComponent } from '../dcpowerbulkrequest/dcpowerbulkrequest.component';
import { DcpowerbulkrequestdetailComponent } from '../dcpowerbulkrequest/detail/dcpowerbulkrequestdetail.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'mminfo', component: DashboardComponent },
			{ path: 'users', component: UserComponent },
			{ path: 'users/:id', component: UserdetailComponent },
			{ path: 'signup', component: UserComponent },
			{ path: 'signup/:id', component: UserdetailComponent },
			{ path: 'users/:id/changepass', component: ChangepasswordComponent },
			{ path: 'roles', component: RoleComponent },
			{ path: 'roles/:id', component: RoledetailComponent },
			{ path: 'functioncodes', component: FunctioncodeComponent },
			{ path: 'functioncodes/:id', component: FunctioncodedetailComponent },
			{ path: 'userroleassign', component: UserroleComponent },	
			{ path: 'rolefeatureassign', component: RolefeatureComponent },
			{ path: 'fileuploads', component: FileuploadComponent },
			{ path: 'fileuploads/:id', component: FileuploaddetailComponent },
			{ path: 'audittrails', component: AudittrailComponent },
			{ path: 'audittrails/:id', component: AudittraildetailComponent },
			{ path: 'sampledashboards', component: SampledashboardComponent },
			{ path: 'sampledashboards/:id', component: SampledashboarddetailComponent },
			{ path: 'automationitems', component: AutomationitemComponent },
			{ path: 'automationitems/:id', component: AutomationitemdetailComponent },
			{ path: 'automationwiseschedulerconfigurations', component: AutomationwiseschedulerconfigurationComponent },
			{ path: 'automationwiseschedulerconfigurations/:id', component: AutomationwiseschedulerconfigurationdetailComponent },
			{ path: 'padhdisplaydevicepicstatuss', component: PadhdisplaydevicepicstatusComponent },
			{ path: 'padhdisplaydevicepicstatuss/:id', component: PadhdisplaydevicepicstatusdetailComponent },
			{ path: 'mpbnassetinventorys', component: MpbnassetinventoryComponent },
			{ path: 'mpbnassetinventorys/:id', component: MpbnassetinventorydetailComponent },
			{ path: 'padhdisplaydevices', component: PadhdisplaydeviceComponent },
			{ path: 'padhdisplaydevices/:id', component: PadhdisplaydevicedetailComponent },
			{ path: 'padhdisplayhealthverboses', component: PadhdisplayhealthverboseComponent},
			{ path: 'padhdisplayhealthverboses/:id', component: PadhdisplayhealthverbosedetailComponent },
			{ path:'onDemandDisplayDevice', component: OnDemandExecutionDisplayDeviceComponent},
			{ path: 'padhdisplayhealthverboses', component: PadhdisplayhealthverboseComponent },
			{ path: 'padhdisplayhealthverboses/:id', component: PadhdisplayhealthverbosedetailComponent },
			{ path: 'fsadisplaysecuritypolicyrulealls', component: FsadisplaysecuritypolicyruleallComponent },
			{ path: 'fsadisplaysecuritypolicyrulealls/:id', component: FsadisplaysecuritypolicyrulealldetailComponent },
			{ path: 'fsadisplayfirewallsessions', component: FsadisplayfirewallsessionComponent },
			{ path: 'fsadisplayfirewallsessions/:id', component: FsadisplayfirewallsessiondetailComponent },
			{ path: 'automationschedulers', component: AutomationschedulerComponent },
			{ path: 'automationschedulers/:id', component: AutomationschedulerdetailComponent },
			{ path: 'warrantysupportclaims', component: WarrantysupportclaimComponent },
			{ path: 'warrantysupportclaims/:id', component: WarrantysupportclaimdetailComponent },
			{ path:'onDemandDspSecurityPolicy', component: OnDemandExecutionDspruleallComponent},
			{ path: 'dcpowermanagements', component: DcpowermanagementComponent },
			{ path: 'dcpowermanagements/:id', component: DcpowermanagementdetailComponent },
			{ path:'onDemandDisplayHealthVerbose', component: OnDemandDisplayHealthVerboseComponent},
			{ path:'onDemandDisplayDevicePicstatus', component: OnDemandExcutionDdpicstatusComponent},
			{ path:'onDemandDspSecurityPolicy', component: OnDemandExecutionDspruleallComponent},
			{ path: 'dcpoweractivitywiseslas', component: DcpoweractivitywiseslaComponent },
			{ path: 'dcpoweractivitywiseslas/:id', component: DcpoweractivitywisesladetailComponent },
			{ path: 'dcpoweritemwisewarrantys', component: DcpoweritemwisewarrantyComponent },
			{ path: 'dcpoweritemwisewarrantys/:id', component: DcpoweritemwisewarrantydetailComponent },
			{ path: 'dcpowervendors', component: DcpowervendorComponent },
			{ path: 'dcpowervendors/:id', component: DcpowervendordetailComponent },
			{ path: 'dcpowersitelists', component: DcpowersitelistComponent },
			{ path: 'dcpowersitelists/:id', component: DcpowersitelistdetailComponent },
			{ path:'picStatusPrediction',component:PadhdisplaydevicepicstatuspredictiongridComponent},
			{ path:'displayDevicePrediction',component:PadhdisplaydevicehealthpredictiongridComponent},
			{ path:'displayHealthVerbosePrediction',component:PadhhealthverbosepredgridComponent},
			{ path: 'schedulestatuss', component: SchedulestatusComponent },
			{ path: 'schedulestatuss/:id', component: SchedulestatusdetailComponent },
			{ path:'cpuusageprediction', component:PadhdisplaydevichealthvervosecpupredictiongridComponent},
			{ path:'onDemandDspFirewallSession',component:OnDemandExecutionDfSessionComponent},
			{ path: 'trafficpathanalysiss', component: TrafficpathanalysisComponent },
			{ path: 'trafficpathanalysiss/:id', component: TrafficpathanalysisdetailComponent },
			{ path:'onDemandTrafficPathAnalysis', component:OnDemandTrafficPathAnalysisComponent},
			{ path: 'ldsettlementincidents', component: LdsettlementincidentComponent },
			{ path: 'ldsettlementincidents/:id', component: LdsettlementincidentdetailComponent },
			{ path: 'ldsettlementsitedowns', component: LdsettlementsitedownComponent },
			{ path: 'ldsettlementsitedowns/:id', component: LdsettlementsitedowndetailComponent },
			{ path: 'ldsettlementdclows', component: LdsettlementdclowComponent },
			{ path: 'ldsettlementdclows/:id', component: LdsettlementdclowdetailComponent },
			{ path: 'ldsettlementpgs', component: LdsettlementpgComponent },
			{ path: 'ldsettlementpgs/:id', component: LdsettlementpgdetailComponent },
			{ path: 'ldsettlementmainsfailures', component: LdsettlementmainsfailureComponent },
			{ path: 'ldsettlementmainsfailures/:id', component: LdsettlementmainsfailuredetailComponent },
			{ path: 'ldsettlementgensetonloadreports', component: LdsettlementgensetonloadreportComponent },
			{ path: 'ldsettlementgensetonloadreports/:id', component: LdsettlementgensetonloadreportdetailComponent },
			{ path: 'ldsettlementsiteavailabilitys', component: LdsettlementsiteavailabilityComponent },
			{ path: 'ldsettlementsiteavailabilitys/:id', component: LdsettlementsiteavailabilitydetailComponent },
			{ path: 'ldsettlementexternalalarms', component: LdsettlementexternalalarmComponent },
			{ path: 'ldsettlementexternalalarms/:id', component: LdsettlementexternalalarmdetailComponent },
			{ path: 'trafficpathkpireports', component: TrafficpathkpireportComponent },
			{ path: 'trafficpathkpireports/:id', component: TrafficpathkpireportdetailComponent },
			{ path: 'performancedatau2000ips', component: Performancedatau2000ipComponent },
			{ path: 'performancedatau2000ips/:id', component: Performancedatau2000ipdetailComponent },
			{ path: 'pendingunusedfirewallrules', component: PendingunusedfirewallruleComponent },
			{ path: 'pendingunusedfirewallrules/:id', component: PendingunusedfirewallruledetailComponent },
			{ path: 'ldsettlementdecisions', component: LdsettlementdecisionComponent },
			{ path: 'ldsettlementdecisions/:id', component: LdsettlementdecisiondetailComponent },
			{ path: 'sitewisedcavailabilityandldvalues', component: SitewisedcavailabilityandldvalueComponent },
			{ path: 'sitewisedcavailabilityandldvalues/:id', component: SitewisedcavailabilityandldvaluedetailComponent },
			{ path: 'semalarmdatas', component: SemalarmdataComponent },
			{ path: 'semalarmdatas/:id', component: SemalarmdatadetailComponent },
			{ path: 'linkfromdigitouchs', component: LinkfromdigitouchComponent },
			{ path: 'linkfromdigitouchs/:id', component: LinkfromdigitouchdetailComponent },
			{ path: 'ldsettlementsiteprioritykpis', component: LdsettlementsiteprioritykpiComponent },
			{ path: 'ldsettlementsiteprioritykpis/:id', component: LdsettlementsiteprioritykpidetailComponent },
			{ path: 'ldsettlementldcalculations', component: LdsettlementldcalculationComponent },
			{ path: 'ldsettlementldcalculations/:id', component: LdsettlementldcalculationdetailComponent },
			{ path: 'alarmnames', component: AlarmnameComponent },
			{ path: 'alarmnames/:id', component: AlarmnamedetailComponent },
			{ path: 'alarmchilds', component: AlarmchildComponent },
			{ path: 'alarmchilds/:id', component: AlarmchilddetailComponent },
			{ path: 'alarmoduslotmappings', component: AlarmoduslotmappingComponent },
			{ path: 'alarmoduslotmappings/:id', component: AlarmoduslotmappingdetailComponent },
			{ path: 'ldsettlementdashboard', component: LdsettlementDashboardComponent },
			{ path: 'troubletickets', component: TroubleticketComponent },
			{ path: 'troubletickets/:id', component: TroubleticketdetailComponent },
			{ path: 'mwalarmdashboards', component: MwalarmdashboardComponent },
			{ path: 'mwalarmdashboards/:id', component: MwalarmdashboarddetailComponent },
			{ path: 'dcpowerrequesttypes', component: DcpowerrequesttypeComponent },
			{ path: 'dcpowerrequesttypes/:id', component: DcpowerrequesttypedetailComponent },
			{ path: 'dcpowerrequestdevicetypes', component: DcpowerrequestdevicetypeComponent },
			{ path: 'dcpowerrequestdevicetypes/:id', component: DcpowerrequestdevicetypedetailComponent },
			{ path: 'rocs', component: RocComponent },
			{ path: 'rocs/:id', component: RocdetailComponent },
			{ path: 'locationhierarchyosss', component: LocationhierarchyossComponent },
			{ path: 'locationhierarchyosss/:id', component: LocationhierarchyossdetailComponent },
			{ path: 'chartconfigurations', component: ChartconfigurationComponent },
			{ path: 'chartconfigurations/:id', component: ChartconfigurationdetailComponent },
			{ path: 'ticketassignedgroups', component: TicketassignedgroupComponent },
			{ path: 'ticketassignedgroups/:id', component: TicketassignedgroupdetailComponent },
			{ path: 'ericssonrsls', component: EricssonrslComponent },
			{ path: 'ericssonrsls/:id', component: EricssonrsldetailComponent },
			{ path: 'ericssontsls', component: EricssontslComponent },
			{ path: 'ericssontsls/:id', component: EricssontsldetailComponent },
			{ path: 'huaweirsltsls', component: HuaweirsltslComponent },
			{ path: 'huaweirsltsls/:id', component: HuaweirsltsldetailComponent },
			{ path: 'soemconfigdataminlinktneths', component: SoemconfigdataminlinktnethComponent },
			{ path: 'soemconfigdataminlinktneths/:id', component: SoemconfigdataminlinktnethdetailComponent },
			{ path: 'mwutilizationdashboards', component: MwutilizationdashboardComponent },
			{ path: 'mwutilizationdashboards/:id', component: MwutilizationdashboarddetailComponent },
			{ path: 'utilisationericssonlans', component: UtilisationericssonlanComponent },
			{ path: 'utilisationericssonlans/:id', component: UtilisationericssonlandetailComponent },
			{ path: 'utilisationericssonwans', component: UtilisationericssonwanComponent },
			{ path: 'utilisationericssonwans/:id', component: UtilisationericssonwandetailComponent },
			{ path: 'mwrsltsldashboards', component: MwrsltsldashboardComponent },
			{ path: 'mwrsltsldashboards/:id', component: MwrsltsldashboarddetailComponent },
			{ path: 'ticketingfilters', component: TicketingfilterComponent },
			{ path: 'ticketingfilters/:id', component: TicketingfilterdetailComponent },
			{ path: 'dashboardconfigurationforrsltsls', component: DashboardconfigurationforrsltslComponent },
			{ path: 'dashboardconfigurationforrsltsls/:id', component: DashboardconfigurationforrsltsldetailComponent },
			{ path: 'configurablecategorys', component: ConfigurablecategoryComponent },
			{ path: 'configurablecategorys/:id', component: ConfigurablecategorydetailComponent },
			{ path: 'microwavelinkreports', component: MicrowavelinkreportComponent },
			{ path: 'microwavelinkreports/:id', component: MicrowavelinkreportdetailComponent },
			{ path: 'huaweiportutilizations', component: HuaweiportutilizationComponent },
			{ path: 'huaweiportutilizations/:id', component: HuaweiportutilizationdetailComponent },
			{ path: 'rsltslvariations', component: RsltslvariationComponent },
			{ path: 'rsltslvariations/:id', component: RsltslvariationdetailComponent },
			{ path: 'mwadaptivemodulationdashboards', component: MwadaptivemodulationdashboardComponent },
			{ path: 'mwadaptivemodulationdashboards/:id', component: MwadaptivemodulationdashboarddetailComponent },
			{ path: 'adaptivemodulationdashboardconfigurations', component: AdaptivemodulationdashboardconfigurationComponent },
			{ path: 'adaptivemodulationdashboardconfigurations/:id', component: AdaptivemodulationdashboardconfigurationdetailComponent },
			{ path: 'licensingdashboardconfigurations', component: LicensingdashboardconfigurationComponent },
			{ path: 'licensingdashboardconfigurations/:id', component: LicensingdashboardconfigurationdetailComponent },
			{ path: 'licensingdashboards', component: LicensingdashboardComponent },
			{ path: 'licensingdashboards/:id', component: LicensingdashboarddetailComponent },
			{ path: 'uniquelinktableforsltsls', component: UniquelinktableforsltslComponent },
			{ path: 'uniquelinktableforsltsls/:id', component: UniquelinktableforsltsldetailComponent },
			{ path: 'uniquelinktableforutilizations', component: UniquelinktableforutilizationComponent },
			{ path: 'uniquelinktableforutilizations/:id', component: UniquelinktableforutilizationdetailComponent },
			{ path: 'customerinsightavailabiltys', component: CustomerinsightavailabiltyComponent },
			{ path: 'customerinsightavailabiltys/:id', component: CustomerinsightavailabiltydetailComponent },
			{ path: 'uniqueinterfacetableforutilizations', component: UniqueinterfacetableforutilizationComponent },
			{ path: 'uniqueinterfacetableforutilizations/:id', component: UniqueinterfacetableforutilizationdetailComponent },
			{ path: 'utilizationdashboardconfigurations', component: UtilizationdashboardconfigurationComponent },
			{ path: 'utilizationdashboardconfigurations/:id', component: UtilizationdashboardconfigurationdetailComponent },
			{ path: 'ericssonmodulations', component: EricssonmodulationComponent },
			{ path: 'ericssonmodulations/:id', component: EricssonmodulationdetailComponent },
			{ path: 'mwdcndashboards', component: MwdcndashboardComponent },
			{ path: 'mwdcndashboards/:id', component: MwdcndashboarddetailComponent },
			{ path: 'mwdcndashboardconfigurations', component: MwdcndashboardconfigurationComponent },
			{ path: 'mwdcndashboardconfigurations/:id', component: MwdcndashboardconfigurationdetailComponent },
			{ path: 'unusedandmostusedrulereport', component: UnusedandmostusedrulereportComponent },
			{ path: 'denyhitipreport', component: DenyhitipreportComponent },
			{ path: 'uniquelinktableforadaptivemodulations', component: UniquelinktableforadaptivemodulationComponent },
			{ path: 'uniquelinktableforadaptivemodulations/:id', component: UniquelinktableforadaptivemodulationdetailComponent },
			{ path: 'informationrepositorys', component: InformationrepositoryComponent },
			{ path: 'informationrepositorys/:id', component: InformationrepositorydetailComponent },
			{ path: 'ericssonlicensefalmoduleinventorys', component: EricssonlicensefalmoduleinventoryComponent },
			{ path: 'ericssonlicensefalmoduleinventorys/:id', component: EricssonlicensefalmoduleinventorydetailComponent },
			{ path: 'ericssonlicensemoduleinventorys', component: EricssonlicensemoduleinventoryComponent },
			{ path: 'ericssonlicensemoduleinventorys/:id', component: EricssonlicensemoduleinventorydetailComponent },
			{ path: 'qosradioqualityericssons', component: QosradioqualityericssonComponent },
			{ path: 'qosradioqualityericssons/:id', component: QosradioqualityericssondetailComponent },
			{ path: 'mwqosdashboardconfigurations', component: MwqosdashboardconfigurationComponent },
			{ path: 'mwqosdashboardconfigurations/:id', component: MwqosdashboardconfigurationdetailComponent },
			{ path: 'mwqosdashboards', component: MwqosdashboardComponent },
			{ path: 'mwqosdashboards/:id', component: MwqosdashboarddetailComponent },
			{ path: 'serverhealthcheckinventorys', component: ServerhealthcheckinventoryComponent },
			{ path: 'serverhealthcheckinventorys/:id', component: ServerhealthcheckinventorydetailComponent },
			{ path: 'huaweilicenses', component: HuaweilicenseComponent },
			{ path: 'huaweilicenses/:id', component: HuaweilicensedetailComponent },
			{ path: 'dcnericssonalarms', component: DcnericssonalarmComponent },
			{ path: 'dcnericssonalarms/:id', component: DcnericssonalarmdetailComponent },

			{ path: 'backupnodes', component: BackupnodeComponent },
			{ path: 'backupnodes/:id', component: BackupnodedetailComponent },
			{ path: 'backuphistorys', component: BackuphistoryComponent },
			{ path: 'backuphistorys/:id', component: BackuphistorydetailComponent },
			{ path: 'backuppolicys', component: BackuppolicyComponent },
			{ path: 'backuppolicys/:id', component: BackuppolicydetailComponent },
			{ path: 'backupcalendars', component: BackupcalendarComponent },
			{ path: 'backupcalendars/:id', component: BackupcalendardetailComponent },
          
			{ path: 'licensinghuaweidashboards', component: LicensinghuaweidashboardComponent },
			{ path: 'licensinghuaweidashboards/:id', component: LicensinghuaweidashboarddetailComponent },
			{ path: 'licensingreports', component: LicensingreportComponent },
			{ path: 'licensingreports/:id', component: LicensingreportdetailComponent },

      		{ path: 'qosconfigurationstandards', component: QosconfigurationstandardComponent },
			{ path: 'qosconfigurationstandards/:id', component: QosconfigurationstandarddetailComponent },
			{ path: 'userprioritymappingconfigurationvalues', component: UserprioritymappingconfigurationvalueComponent },
			{ path: 'userprioritymappingconfigurationvalues/:id', component: UserprioritymappingconfigurationvaluedetailComponent },
			{ path: 'huaweiqoss', component: HuaweiqosComponent },
			{ path: 'huaweiqoss/:id', component: HuaweiqosdetailComponent },

			{ path: 'serverhealthreports', component: ServerhealthreportComponent },
			{ path: 'serverhealthreports/:id', component: ServerhealthreportdetailComponent },

			{ path: 'qosericssontneths', component: QosericssontnethComponent },
			{ path: 'qosericssontneths/:id', component: QosericssontnethdetailComponent },
			{ path: 'mwserviceqosdashboards', component: MwserviceqosdashboardComponent },
			{ path: 'mwserviceqosdashboards/:id', component: MwserviceqosdashboarddetailComponent },
			{ path: 'mwserviceqosdashboardconfigurations', component: MwserviceqosdashboardconfigurationComponent },
			{ path: 'mwserviceqosdashboardconfigurations/:id', component: MwserviceqosdashboardconfigurationdetailComponent },
			{ path: 'emsfiledirectoryrepositorys', component: EmsfiledirectoryrepositoryComponent },
			{ path: 'emsfiledirectoryrepositorys/:id', component: EmsfiledirectoryrepositorydetailComponent },
			{path:'onDemandServerHealthCheck', component: OnDemandHealthCheckComponent},
			{ path: 'emsfileavailabilityreports', component: EmsfileavailabilityreportComponent },
			{ path: 'emsfileavailabilityreports/:id', component: EmsfileavailabilityreportdetailComponent },
			{path:'OnDemandEmsFileDirectoryCheck', component: OnDemandEmsFileDirectoryCheckComponent},
			{ path: 'qosericssonconfigurationdatas', component: QosericssonconfigurationdataComponent },
			{ path: 'qosericssonconfigurationdatas/:id', component: QosericssonconfigurationdatadetailComponent },
			{ path: 'soemneinventorys', component: SoemneinventoryComponent },
			{ path: 'soemneinventorys/:id', component: SoemneinventorydetailComponent },
			{ path: 'huaweiinterfaceportreports', component: HuaweiinterfaceportreportComponent },
			{ path: 'huaweiinterfaceportreports/:id', component: HuaweiinterfaceportreportdetailComponent },
			{ path: 'datascriptsstorys', component: DatascriptsstoryComponent },
			{ path: 'datascriptsstorys/:id', component: DatascriptsstorydetailComponent },
			{ path: 'comprehensivedashboardconfigurations', component: ComprehensivedashboardconfigurationComponent },
			{ path: 'comprehensivedashboardconfigurations/:id', component: ComprehensivedashboardconfigurationdetailComponent },
			{ path: 'comprehensivedashboards', component: ComprehensivedashboardComponent },
			{ path: 'comprehensivedashboards/:id', component: ComprehensivedashboarddetailComponent },
			{ path: 'dcpowerbulkrequests', component: DcpowerbulkrequestComponent },
			{ path: 'dcpowerbulkrequests/:id', component: DcpowerbulkrequestdetailComponent }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRountingModule { }
