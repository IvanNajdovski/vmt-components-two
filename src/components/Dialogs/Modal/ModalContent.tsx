//@ts-nocheck
import React from "react";
import { CustomerRmsBulkUpdate } from "./CustomerRmsBulkUpdate/CustomerRmsBulkUpdate";
import { FloorBulkUpdate } from "./FloorBulkUpdate/FloorBulkUpdate";
import { UploadModal } from "./UploadModal/UploadModal";
import { MarketShiftUpdate } from "./MarketShiftUpdate/MarketShiftUpdate";
import { Export } from "./Export/Export";
import { AttributesTerminate } from "./AttributesTerminate/AttributesTerminate";
import { SendEmail } from "./SendEmail/SendEmail";
import { CopyFloorModal } from "./CopyModal/CopyFloorModal";
import { CopyCurrentModal } from "./CopyModal/CopyCurrentModal";
import { CustomerConflictResolverModal } from "./CustomerConflictResolverModal/CustomerConflictResolverModal";
import { FloorRatesConflictResolverModal } from "./FloorRateConflictResolverModal/FloorRateConflictResolverModal";
import { FloorAttributesConflictResolverModal } from "./FloorAttributesConflictResolverModal/FloorAttributesConflictResolverModal";

export const ModalContent = ({ componentType = null, componentText, ...rest }) => {
  switch (componentType) {
    case "bulkUpdate":
      return <CustomerRmsBulkUpdate {...rest} />;
    case "floorBulkUpdate":
      return <FloorBulkUpdate {...rest} />;
    case "uploadModal":
      return <UploadModal {...rest} />;
    case "marketShiftUpdate":
      return <MarketShiftUpdate {...rest} />;
    case "export":
      return <Export {...rest} />;
    case "terminateRecord":
      return <AttributesTerminate {...rest} />;
    case "sendEmail":
      return <SendEmail {...rest} />;
    case "copyFloorModal":
      return <CopyFloorModal {...rest} />;
    case "copyCurrentModal":
      return <CopyCurrentModal {...rest} />;
    case "customerConflictResolver":
      return <CustomerConflictResolverModal {...rest} />;
    case "floorRateConflictResolver":
      return <FloorRatesConflictResolverModal {...rest} />;
    case "floorAttributesConflictResolver":
      return <FloorAttributesConflictResolverModal {...rest} />;
    default:
      return <p className={"text-center m-2"}>{componentText}</p>;
  }
};
