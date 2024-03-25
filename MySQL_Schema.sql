CREATE SCHEMA KitCheckFlow;

USE KitCheckFlow;

#
# TABLE STRUCTURE FOR: KitInfo
#

CREATE TABLE KitInfo (
  Id INT UNIQUE AUTO_INCREMENT,
  KitId varchar(255),
  LeftSensorId varchar(255),
  RightSensorId varchar(255),
  PhoneId varchar(255),
  PRIMARY KEY(Id)
);

#
# TABLE STRUCTURE FOR: ReportInfo
#

CREATE TABLE ReportInfo (
  ReportId INT AUTO_INCREMENT,
  LastKnownUser varchar(255),
  Tester varchar(255),
  DateTested DATETIME DEFAULT CURRENT_TIMESTAMP,
  ReportLocation varchar(255),
  TesterComments varchar(255),
  KitId varchar(255),
  PRIMARY KEY(ReportId)
);

#
# TABLE STRUCTURE FOR: HeadsetInfo
#

CREATE TABLE HeadsetInfo (
  Id INT UNIQUE AUTO_INCREMENT,
  PhysicalDamage varchar(255),
  ConnectorDamage varchar(255),
  ConditionOfCables varchar(255),
  AudioFuncLeftChannel varchar(255),
  AudioFuncRightChannel varchar(255),
  AudioQuality varchar(255),
  VolButtonFunc varchar(255),
  PowerButtonFunc varchar(255),
  ReportId INT,
  KitId varchar(255),
  PRIMARY KEY(Id),
  FOREIGN KEY (ReportId) REFERENCES ReportInfo(ReportId)
);

#
# TABLE STRUCTURE FOR: HubInfo
#

CREATE TABLE HubInfo (
  Id INT UNIQUE AUTO_INCREMENT,
  PhysicalDamage varchar(255),
  ConditionOfCables varchar(255),
  ChargerCondition varchar(255),
  HubPortFunc varchar(255),
  HubOverheat varchar(255),
  ReportId INT,
  KitId varchar(255),
  PRIMARY KEY(Id),
  FOREIGN KEY (ReportId) REFERENCES ReportInfo(ReportId)
);


#
# TABLE STRUCTURE FOR: LeftSensor
#

CREATE TABLE LeftSensor(
    Id INT UNIQUE AUTO_INCREMENT,
    LeftSensorId varchar(255),
    PhysicalDamage varchar(255),
    ConnectorFunc varchar(255),
    MountingBrackets varchar(255),
    ConditionOfCables varchar(255),
    BluetoothFunc varchar(255),
    DataTrans varchar(255),
    ReportId INT,
    KitId varchar(255),
    PRIMARY KEY(Id),
    FOREIGN KEY (ReportId) REFERENCES ReportInfo(ReportId)
 );

#
# TABLE STRUCTURE FOR: PhoneInfo
#
    
CREATE TABLE PhoneInfo(
    Id INT UNIQUE AUTO_INCREMENT,
    PhoneId varchar(255),
    PhysicalDamage varchar(255),
    VolButtonFunc varchar(255),
    PowerButtonFunc varchar(255),
    ChargingPort varchar(255),
    SIMCardFunc varchar(255),
    MemCardFunc varchar(255),
    PhoneCaseCondition varchar(255),
    ConditionOfCable varchar(255),
    TouchScreenFunc varchar(255),
    WiFiFunc varchar(255),
    BluetoothFunc varchar(255),
    CellDataFunc varchar(255),
    SpeakerFunc varchar(255),
    ReportId INT,
    KitId varchar(255),
    PRIMARY KEY(Id),
    FOREIGN KEY (ReportId) REFERENCES ReportInfo(ReportId)
);

#
# TABLE STRUCTURE FOR: RightSensor
#

CREATE TABLE RightSensor(
    Id INT UNIQUE AUTO_INCREMENT,
    RightSensorId varchar(255),
    PhysicalDamage varchar(255),
    ConnectorFunc varchar(255),
    MountingBrackets varchar(255),
    ConditionOfCables varchar(255),
    BluetoothFunc varchar(255),
    DataTrans varchar(255),
    ReportId INT,
    KitId varchar(255),
    PRIMARY KEY(Id),
    FOREIGN KEY (ReportId) REFERENCES ReportInfo(ReportId)
);



