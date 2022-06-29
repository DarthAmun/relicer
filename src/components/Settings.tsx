import { useState, useEffect } from "react";
import { FaFileExport, FaTrashAlt } from "react-icons/fa";
import {
  Modal,
  Button,
  Divider,
  Uploader,
  Progress,
  InputGroup,
  Input,
  Panel,
  toaster,
  Notification,
} from "rsuite";
import { FileType } from "rsuite/esm/Uploader";
import styled from "styled-components";
import { deleteDatabase } from "../services/DatabaseService";
import { downloadBackup } from "../services/DownloadService";
import { importFile } from "../services/UploadService";

const Settings = () => {
  const [showResetDialog, setResetDialog] = useState<boolean>(false);
  const [files, setFiles] = useState<FileType[]>([]);
  const [progress, updateBackupProgress] = useState<number>(0);
  const [webhook, setWebhook] = useState<string>(
    localStorage.getItem("webhook") + ""
  );
  const [webhookUser, setWebhookUser] = useState<string>(
    localStorage.getItem("webhook_user") + ""
  );
  useEffect(() => {
    if (webhook !== localStorage.getItem("webhook"))
      localStorage.setItem("webhook", webhook);
  }, [webhook]);

  useEffect(() => {
    if (webhookUser !== localStorage.getItem("webhook_user"))
      localStorage.setItem("webhook_user", webhookUser);
  }, [webhookUser]);

  const handleUpload = (file: FileType) => {
    importFile(file);
  };

  const handleSuccess = (response: object, file: FileType) => {
    toaster.push(
      <Notification closable header={"Success"} type="success">
        Success: Imported {file.name}.
      </Notification>,
      { placement: "bottomStart" }
    );
  };

  const resetDatabase = () => {
    deleteDatabase();
    setResetDialog(false);
    toaster.push(
      <Notification closable header={"Success"} type="success">
        Success: Reset Database.
      </Notification>,
      { placement: "bottomStart" }
    );
  };

  return (
    <ContentWrapper>
      <OptionContent>
        <Modal open={showResetDialog} onClose={() => setResetDialog(false)}>
          <Modal.Header>
            <Modal.Title>Attention</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to rest the database and delete all data
            stored?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => resetDatabase()} appearance="primary">
              Yes, reset!
            </Button>
            <Button onClick={() => setResetDialog(false)} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <Divider>General</Divider>
        <PanelGroup>
          <StyledPanel header={`Import DB Backup (.json)`}>
            <Uploader
              fileList={files}
              action={window.location.href}
              draggable
              multiple
              autoUpload
              onUpload={handleUpload}
              onSuccess={handleSuccess}
              onChange={setFiles}
              accept={".pnptome, .json"}
            >
              <div style={{ lineHeight: "100px" }}>
                Click or Drag files to this area to upload
              </div>
            </Uploader>
          </StyledPanel>
          <StyledPanel header={`Backup DB (.json)`}>
            <Wrapper>
              Create a backup of the database with all the homebrew in it to
              download.
              <br />
              <br />
              <Button
                appearance="primary"
                onClick={() =>
                  downloadBackup("Relicer_all.json", updateBackupProgress)
                }
              >
                <FaFileExport /> Download Backup
              </Button>
              {progress > 0 && (
                <Progress percent={progress} strokeColor="#F55C5C" />
              )}
            </Wrapper>
          </StyledPanel>
          <StyledPanel header={`Reset DB`}>
            <Wrapper>
              Reset the database which will result in all data been permanently
              deleted.
              <br />
              <br />
              <Button appearance="primary" onClick={() => setResetDialog(true)}>
                <FaTrashAlt /> Reset Database
              </Button>
            </Wrapper>
          </StyledPanel>
        </PanelGroup>
        <Divider>Discord</Divider>
        <PanelGroup>
          <StyledPanel header="Webhook">
            <InputGroup>
              <InputGroup.Addon>PlayerName</InputGroup.Addon>
              <Input
                value={webhookUser}
                onChange={(val: any) => setWebhookUser(val)}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Addon>Webhook</InputGroup.Addon>
              <Input value={webhook} onChange={(val: any) => setWebhook(val)} />
            </InputGroup>
          </StyledPanel>
        </PanelGroup>
      </OptionContent>
    </ContentWrapper>
  );
};

export default Settings;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const OptionContent = styled.div`
  width: 100%;
`;

const PanelGroup = styled.div`
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const StyledPanel = styled(Panel)`
  width: 400px;
  background-color: ${({ theme }) => theme.secondColor};
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.mainColor};

  & .rs-panel-body {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
  }

  & .rs-input-group {
    margin-bottom: 5px;
  }
`;

const Wrapper = styled.div`
  flex: 1 1;
`;
const FlexWrapper = styled(Wrapper)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
`;

const VerticalDivider = styled.div`
  flex: 1 1;
  max-width: 1px;
  margin: 10px;
  border-left: 1px solid var(--rs-divider-border);
`;

const CustomeThemeEditor = styled.div`
  margin-top: 10px;
`;

const ColorCircle = styled.div<{ color: string }>`
  height: 20px;
  width: 20px;
  border-radius: 30px;
  background-color: ${(props) => props.color};
`;
