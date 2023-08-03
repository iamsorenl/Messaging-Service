package edu.ucsc.cse118.assignment3

import androidx.test.espresso.matcher.ViewMatchers.withText
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.LargeTest
import com.adevinta.android.barista.assertion.BaristaEnabledAssertions.assertDisabled
import com.adevinta.android.barista.assertion.BaristaEnabledAssertions.assertEnabled
import com.adevinta.android.barista.assertion.BaristaHintAssertions.assertHint
import com.adevinta.android.barista.assertion.BaristaVisibilityAssertions.assertDisplayed
import com.adevinta.android.barista.interaction.BaristaClickInteractions.clickOn
import com.adevinta.android.barista.interaction.BaristaEditTextInteractions.typeTo
import edu.ucsc.cse118.assignment3.TestHelper.waitForText
import edu.ucsc.cse118.assignment3.TestHelper.waitForView

import org.junit.Test
import org.junit.Rule
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
@LargeTest
class BasicTest {
  /**
   * Create and launch the activity under test before each test,
   * and close it after each test.
   */
  @get:Rule
  var activityScenarioRule = ActivityScenarioRule(MainActivity::class.java)

  // Change these three lines ONLY
  private val cruzid = "snlarsen@ucsc.edu"
  private val name = "Soren Larsen"
  private val password = "1766364"

  private fun login() {
    typeTo(R.id.email, cruzid)
    typeTo(R.id.password, password)
    clickOn("LOGIN")
  }
  private fun construction() {
    login()
    waitForText("Construction")
    clickOn("Construction")
  }
  private fun framing() {
    construction()
    waitForText("Framing (Wood)")
    clickOn("Framing (Wood)")
  }
  private fun movies() {
    login()
    waitForText("Movies")
    clickOn("Movies")
  }

  @Test
  fun login_title() {
    assertDisplayed("CSE118 Assignment 3")
  }
  @Test
  fun login_button() {
    assertDisplayed("LOGIN")
  }
  @Test
  fun login_email_hint() {
    assertHint(R.id.email, "Email")
  }
  @Test
  fun login_password_hint() {
    assertHint(R.id.password, "Password")
  }
  @Test
  fun login_button_disabled() {
    assertDisabled(R.id.login)
  }
  @Test
  fun login_short_email() {
    typeTo(R.id.email, "sh")
    typeTo(R.id.password, password)
    assertDisabled(R.id.login)
  }
  @Test
  fun login_short_password() {
    typeTo(R.id.email, cruzid)
    typeTo(R.id.password, "sh")
    assertDisabled(R.id.login)
  }
  @Test
  fun login_button_enabled() {
    typeTo(R.id.email, cruzid)
    typeTo(R.id.password, password)
    assertEnabled(R.id.login)
  }
  @Test
  fun login_error() {
    typeTo(R.id.email, cruzid)
    typeTo(R.id.password, "wrong")
    clickOn("LOGIN")
    waitForView(withText("Failed to login : HTTP 401"))
  }
  @Test
  fun name_in_header() {
    login()
    waitForText(name)
  }
  @Test
  fun workspace_construction() {
    login()
    waitForText("Construction")
  }
  @Test
  fun construction_channel_count() {
    login()
    waitForText("10 Channels")
  }
  @Test
  fun construction_channel_framing() {
    construction()
    waitForText("Framing (Wood)")
  }
  @Test
  fun construction_channel_framing_message_ranice() {
    framing()
    waitForText("Ranice Desantis")
  }
  @Test
  fun construction_channel_framing_message_ranice_date() {
    framing()
    waitForText("Jul 21, 2022, 10:42:36 AM")
  }
  @Test
  fun workspace_movies() {
    login()
    waitForText("Movies")
  }
  @Test
  fun movies_channel_count() {
    login()
    waitForText("3 Channels")
  }
  @Test
  fun movies_channel_drama() {
    movies()
    waitForText("Drama")
  }
}