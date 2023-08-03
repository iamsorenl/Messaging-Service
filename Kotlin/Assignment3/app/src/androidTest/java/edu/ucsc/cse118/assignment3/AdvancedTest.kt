package edu.ucsc.cse118.assignment3

import androidx.recyclerview.widget.RecyclerView
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.Espresso.pressBack
import androidx.test.espresso.action.ViewActions.click
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.LargeTest
import com.adevinta.android.barista.interaction.BaristaClickInteractions.clickOn
import com.adevinta.android.barista.interaction.BaristaEditTextInteractions.typeTo
import edu.ucsc.cse118.assignment3.TestHelper.waitForText
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.contrib.RecyclerViewActions.actionOnItemAtPosition
import androidx.test.espresso.matcher.ViewMatchers.*
import org.hamcrest.CoreMatchers.allOf
import com.google.android.material.snackbar.Snackbar

import org.junit.Test
import org.junit.Rule
import org.junit.runner.RunWith
import java.util.*

/*
* Resources:
* Checking Snackbar Text:
* https://developer.android.com/training/testing/espresso/basics#snackbar
* Checking first item in recycler view and clicking on it:
* https://developer.android.com/training/testing/espresso/lists#recycler-view-list-items
* Press Back:
* https://developer.android.com/training/testing/espresso/basics#interact-nav-drawer-back-button
*/

@RunWith(AndroidJUnit4::class)
@LargeTest
class AdvancedTest {
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
    private fun documentary(){
        movies()
        waitForText("Documentary")
        clickOn("Documentary")
    }

    @Test
    fun fab() {
        framing()
        onView(withId(R.id.fab)).check(matches(isDisplayed()))
    }

    @Test
    fun fab_clickable() {
        framing()
        onView(withId(R.id.fab)).check(matches(isClickable()))
    }

    @Test
    fun fab_enabled() {
        framing()
        onView(withId(R.id.fab)).check(matches(isEnabled()))
    }

    @Test
    fun fab_click_new_message() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        waitForText("New Message")
    }

    @Test
    fun fab_click_content() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        onView(withId(R.id.content)).check(matches(isDisplayed()))
    }

    @Test
    fun fab_click_add() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        waitForText("ADD")
    }

    @Test
    fun fab_click_add_disabled() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        waitForText("ADD")
        onView(withText("ADD")).check(matches(isNotEnabled()))
    }

    @Test
    fun fab_click_add_type_less_than_16_disabled() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "less than 16")
        onView(withText("ADD")).check(matches(isNotEnabled()))
    }

    @Test
    fun fab_click_add_type_exactly_16_enabled() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "exactly sixteen!")
        onView(withText("ADD")).check(matches(isEnabled()))
    }

    @Test
    fun fab_click_add_type_more_than_16_enabled() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "a lot more than 16")
        onView(withText("ADD")).check(matches(isEnabled()))
    }

    @Test
    fun fab_click_add_message_documentary() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "this message is a test documentary")
        onView(withText("ADD")).perform(click())
        waitForText("Documentary")
    }

    @Test
    fun fab_click_add_message_snackbar() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "this message is a test snackbar")
        onView(withText("ADD")).perform(click())
        onView(isAssignableFrom(Snackbar.SnackbarLayout::class.java))
            .check(matches(hasDescendant(withText("Message Created"))))
    }

    @Test
    fun fab_click_add_message() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "Soren Nyholm Larsen")
        onView(withText("ADD")).perform(click())
        waitForText("Soren Nyholm Larsen")
    }

    @Test
    fun fab_click_add_message_content() {
        framing()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "sixteen chars!!!")
        onView(withText("ADD")).perform(click())
        waitForText(name)
        onView(allOf(withId(R.id.recyclerview), isDisplayed()))
            .perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, click()))
        waitForText("sixteen chars!!!")
    }

    @Test
    fun fab_click_add_message_poster() {
        framing()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "sixteen chars!!!")
        onView(withText("ADD")).perform(click())
        waitForText(name)
        onView(allOf(withId(R.id.recyclerview), isDisplayed()))
            .perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, click()))
        waitForText(name)
    }

    @Test
    fun click_fab_undo() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        pressBack()
        waitForText("Documentary")
    }

    @Test
    fun fab_click_add_message_back() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "Soren Nyholm Larsen")
        onView(withText("ADD")).perform(click())
        pressBack()
        waitForText("Movies")
    }
}