/*
 * Copyright (C) 2022-2023 David C. Harrison. All right reserved.
 *
 * You may not use, distribute, publish, or modify this code without
 * the express written permission of the copyright holder.
 */

/* **************************************************************************
 * Must be using Node.js Version 18 or above
 * **************************************************************************/

/* **************************************************************************
 * Use your own username and password for these tests
 * **************************************************************************/

const cruzid = 'snlarsen@ucsc.edu';
const studentid = '1766364';

import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react-native';

import App from '../App';

const login = (email = cruzid, password = studentid) => {
  render(<App />);
  fireEvent.changeText(screen.getByLabelText('email'), email);
  fireEvent.changeText(screen.getByLabelText('password'), password);
  fireEvent.press(screen.getByLabelText('login'));
};

const waitForTextThenClick = async text => {
  await waitFor(() => screen.getByText(text));
  fireEvent.press(screen.getByText(text));
};

const waitForLabelTextThenClick = async labelText => {
  await waitFor(() => screen.getByLabelText(labelText));
  fireEvent.press(screen.getByLabelText(labelText));
};

const waitForFirstLabelTextThenClick = async labelText => {
  await waitFor(() => screen.getAllByLabelText(labelText));
  fireEvent.press(screen.getAllByLabelText(labelText)[0]);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const scrollTo = async (text, labelText, screenHeight, swipes, sleepMillis) => {
  const eventData = {
    nativeEvent: {
      contentOffset: {
        y: screenHeight,
        x: 0,
      },
      contentSize: {
        // Dimensions of the scrollable content
        height: screenHeight,
        width: 100,
      },
      layoutMeasurement: {
        // Dimensions of the device
        height: screenHeight,
        width: 100,
      },
    },
  };
  for (let i = 0; i < swipes; i++) {
    if (screen.queryByText(text) != null) {
      break;
    } else {
      await sleep(sleepMillis);
      fireEvent.scroll(screen.getByLabelText(labelText), eventData);
    }
  }
  screen.getByText(text);
};

/*
 * Log in
 * Add a workspace
 * Assert workspace exists
 * Delete the workspace
 * Assert workspace does not exist
 */
it('Add/Delete Workspace', async () => {
  let name = new Date().toISOString();
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitFor(() => screen.getByText(name));
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${name}`);
  await waitForElementToBeRemoved(() => screen.getByText(name));
  expect(screen.queryByText(name)).toBeNull();
  cleanup();
});

/*
 * Log in
 * Start to add a workspace
 * Cancel
 * Assert back at workspace list
 */
it('Add/Cancel Workspace', async () => {
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.press(screen.getByLabelText('cancel'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  cleanup();
});

/*
 * Log in
 * Start to add a workspace
 * Navigate backwards
 * Assert back at workspace list
 */
it('Add Workspace Move Back', async () => {
  login();
  await waitForLabelTextThenClick('add workspace');
  await waitForLabelTextThenClick('back to workspaces');
  await waitFor(() => screen.getByLabelText('add workspace'));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add a channel
 * Assert channel exists
 * Delete the channel
 * Assert channel does not exist
 * Delete the workspace
 */
it('Add/Delete Channel', async () => {
  let name = new Date().toISOString();
  let channel = name.slice(-10);
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitForTextThenClick(name);
  await waitForLabelTextThenClick('add channel');
  fireEvent.changeText(screen.getByLabelText('name'), channel);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add channel'));
  await waitFor(() => screen.getByText(channel));
  fireEvent(screen.getByText(channel), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${channel}`);
  await waitForElementToBeRemoved(() => screen.getByText(channel));
  expect(screen.queryByText(channel)).toBeNull();
  await waitForLabelTextThenClick('back to workspaces');
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${name}`);
  await waitForElementToBeRemoved(() => screen.getByText(name));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Start to add a channel
 * Cancel
 * Assert back at channel list
 * Delete the workspace
 */
it('Add/Cancel Channel', async () => {
  let name = new Date().toISOString();
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitForTextThenClick(name);
  await waitForLabelTextThenClick('add channel');
  fireEvent.press(screen.getByLabelText('cancel'));
  await waitFor(() => screen.getByLabelText('add channel'));
  await waitForLabelTextThenClick('back to workspaces');
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${name}`);
  await waitForElementToBeRemoved(() => screen.getByText(name));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select a workspace
 * Start to add a channel
 * Navigate backwards
 * Assert back at channel list
 * Delete the workspace
 */
it('Add Channel Move Back', async () => {
  let name = new Date().toISOString();
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitForTextThenClick(name);
  await waitForLabelTextThenClick('add channel');
  await waitForLabelTextThenClick('back to channels');
  await waitFor(() => screen.getByLabelText('add channel'));
  await waitForLabelTextThenClick('back to workspaces');
  await waitFor(() => screen.getByLabelText('add workspace'));
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${name}`);
  await waitForElementToBeRemoved(() => screen.getByText(name));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add Molly Member and Anna Admin as members
 * Assert Molly and Anna are members of the workspace
 * Delete the workspace
 */
it('Add Molly Member/Anna Admin', async () => {
  let name = new Date().toISOString();
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitForTextThenClick(name);
  await waitForLabelTextThenClick('add members');
  // add Molly
  await waitForLabelTextThenClick('add member');
  await scrollTo('Molly Member', 'uninvited members', 500, 5, 200);
  fireEvent(screen.getByText('Molly Member'), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`add Molly Member`);
  // add Anna
  await waitForLabelTextThenClick('add member');
  fireEvent(screen.getByText('Anna Admin'), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`add Anna Admin`);
  await waitFor(() => screen.getByLabelText('add member'));
  await waitFor(() => screen.getByText('Molly Member'));
  await waitFor(() => screen.getByText('Anna Admin'));
  // delete workspace
  fireEvent.press(screen.getByLabelText('back to workspace'));
  await waitForLabelTextThenClick('back to workspaces');
  await waitFor(() => screen.getByLabelText('add workspace'));
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${name}`);
  await waitForElementToBeRemoved(() => screen.getByText(name));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspaca
 * Add William Shakespeare as a member
 * Assert Will is a member of the workspace
 * Remove Will as a member
 * Assert Will is no longer a member of the workspace
 * Delete the workspace
 */
it('Add/Remove William Shakespeare', async () => {
  let name = new Date().toISOString();
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitForTextThenClick(name);
  await waitForLabelTextThenClick('add members');
  // add Will
  await waitForLabelTextThenClick('add member');
  await scrollTo('William Shakespeare', 'uninvited members', 500, 7, 200);
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`add William Shakespeare`);
  // check if will was added
  await waitFor(() => screen.getByLabelText('add member'));
  await waitFor(() => screen.getByText('William Shakespeare'));
  // delete will
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete William Shakespeare`);
  await waitForElementToBeRemoved(() =>
    screen.getByText('William Shakespeare'),
  );
  expect(screen.queryByText('William Shakespeare')).toBeNull();
  // delete workspace
  fireEvent.press(screen.getByLabelText('back to workspace'));
  await waitForLabelTextThenClick('back to workspaces');
  await waitFor(() => screen.getByLabelText('add workspace'));
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${name}`);
  await waitForElementToBeRemoved(() => screen.getByText(name));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add William Shakespeare as a member
 * Log out
 * Log in as will@cse118.com password "will"
 * Assert workspace is visiable
 * Log out
 * Log in
 * Delete the workspace
 */
it('Add Will Assert Workspace Access', async () => {
  let name = new Date().toISOString();
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitForTextThenClick(name);
  await waitForLabelTextThenClick('add members');
  // add Will
  await waitForLabelTextThenClick('add member');
  await scrollTo('William Shakespeare', 'uninvited members', 500, 7, 200);
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`add William Shakespeare`);
  // Logout
  await waitForLabelTextThenClick('back to workspace');
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  login('will@cse118.com', 'will');
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitFor(() => screen.getByText(name));
  await waitForLabelTextThenClick('logout');
  login();
  // delete workspace
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitFor(() => screen.getByText(name));
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${name}`);
  await waitForElementToBeRemoved(() => screen.getByText(name));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add William Shakespeare as a member
 * Add a channel
 * Log out
 * Log in as will@cse118.com password "will"
 * Select the workspace
 * Select the channel
 * Add a new message
 * Assert message is visible
 * Log out
 * Log in
 * Delete the workspace
 */
it('Add Will Add Channel Add Message', async () => {
  let name = new Date().toISOString();
  let channel = name.slice(-10);
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitForTextThenClick(name);
  await waitForLabelTextThenClick('add members');
  // add will
  await waitForLabelTextThenClick('add member');
  await scrollTo('William Shakespeare', 'uninvited members', 500, 7, 200);
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`add William Shakespeare`);
  await waitForLabelTextThenClick('back to workspace');
  // add channel
  await waitForLabelTextThenClick('add channel');
  fireEvent.changeText(screen.getByLabelText('name'), channel);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add channel'));
  // logout
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  // login as will
  login('will@cse118.com', 'will');
  // navigate to channel
  await waitForTextThenClick(name);
  await waitForTextThenClick(channel);
  // add message
  await waitForLabelTextThenClick('add message');
  fireEvent.changeText(screen.getByLabelText('content'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add message'));
  // message is visible
  await waitFor(() => screen.getByText(name));
  // logout
  await waitForLabelTextThenClick('back to channels');
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  // login and delete
  login();
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitFor(() => screen.getByText(name));
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${name}`);
  await waitForElementToBeRemoved(() => screen.getByText(name));
  cleanup();
});

/*
 * Log in
 * Add a workspace
 * Select the workspace
 * Add William Shakespeare as a member
 * Add a channel
 * Add a new message
 * Log out
 * Log in as will@cse118.com password "will"
 * Select the workspace
 * Select the channel
 * Assert message cannot be deleted
 * Log out
 * Log in
 * Delete the workspace
 */

it('Add Message Will Cant Delete', async () => {
  let name = new Date().toISOString();
  let channel = name.slice(-10);
  login();
  await waitForLabelTextThenClick('add workspace');
  fireEvent.changeText(screen.getByLabelText('name'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitForTextThenClick(name);
  await waitForLabelTextThenClick('add members');
  // add will
  await waitForLabelTextThenClick('add member');
  await scrollTo('William Shakespeare', 'uninvited members', 500, 7, 200);
  fireEvent(screen.getByText('William Shakespeare'), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`add William Shakespeare`);
  await waitForLabelTextThenClick('back to workspace');
  // add channel
  await waitForLabelTextThenClick('add channel');
  fireEvent.changeText(screen.getByLabelText('name'), channel);
  fireEvent.press(screen.getByLabelText('add'));
  await waitForTextThenClick(channel);
  // add message
  await waitForLabelTextThenClick('add message');
  fireEvent.changeText(screen.getByLabelText('content'), name);
  fireEvent.press(screen.getByLabelText('add'));
  await waitFor(() => screen.getByLabelText('add message'));
  // logout
  await waitForLabelTextThenClick('back to channels');
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  // login as will
  login('will@cse118.com', 'will');
  // navigate to channel
  await waitForTextThenClick(name);
  await waitForTextThenClick(channel);
  // try to delete message
  await waitFor(() => screen.getByText(name));
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  // asser delete message not visible
  await waitFor(() => {
    const deleteMessageButton = screen.queryByLabelText('delete message');
    expect(deleteMessageButton).toBeNull();
  });
  // logout
  await waitForLabelTextThenClick('back to channels');
  await waitForLabelTextThenClick('back to workspaces');
  await waitForLabelTextThenClick('logout');
  // login and delete
  login();
  await waitFor(() => screen.getByLabelText('add workspace'));
  await waitFor(() => screen.getByText(name));
  fireEvent(screen.getByText(name), 'swipeableRightOpen');
  await waitForFirstLabelTextThenClick(`delete ${name}`);
  await waitForElementToBeRemoved(() => screen.getByText(name));
  cleanup();
});
