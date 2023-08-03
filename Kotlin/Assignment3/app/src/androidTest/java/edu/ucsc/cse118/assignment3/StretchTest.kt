package edu.ucsc.cse118.assignment3

/*
Resources:
* Checking first item in recycler view to swipe it:
* https://developer.android.com/training/testing/espresso/lists#recycler-view-list-items
*
*/

import androidx.recyclerview.widget.RecyclerView
import androidx.test.espresso.Espresso
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.action.ViewActions.*
import androidx.test.espresso.assertion.ViewAssertions.doesNotExist
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.contrib.RecyclerViewActions
import androidx.test.espresso.contrib.RecyclerViewActions.actionOnItemAtPosition
import androidx.test.espresso.matcher.RootMatchers.withDecorView
import androidx.test.espresso.matcher.ViewMatchers.*
import androidx.test.ext.junit.rules.ActivityScenarioRule
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.filters.LargeTest
import com.adevinta.android.barista.interaction.BaristaClickInteractions.clickOn
import com.adevinta.android.barista.interaction.BaristaEditTextInteractions.typeTo
import com.google.android.material.internal.ContextUtils.getActivity
import com.google.android.material.snackbar.Snackbar
import edu.ucsc.cse118.assignment3.TestHelper.waitForText
import junit.framework.TestCase.assertEquals
import org.hamcrest.CoreMatchers.`is`
import org.hamcrest.CoreMatchers.not
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import java.util.*


@RunWith(AndroidJUnit4::class)
@LargeTest
class StretchTest {
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
        waitForText("Rebar & Wire Mesh Install")
        clickOn("Rebar & Wire Mesh Install")
    }

    private fun movies() {
        login()
        waitForText("Movies")
        clickOn("Movies")
    }

    private fun documentary() {
        movies()
        waitForText("Documentary")
        clickOn("Documentary")
    }

    private fun adding() {
        framing()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "sixteen chars!!!")
        onView(withText("ADD")).perform(click())
        waitForText(name)
    }

    @Test
    fun swipe_to_delete_yes() {
        adding()
        val recyclerView = onView(withId(R.id.recyclerview))
        recyclerView.perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, swipeRight()))
        waitForText("YES")
    }

    @Test
    fun swipe_to_delete_no() {
        adding()
        val recyclerView = onView(withId(R.id.recyclerview))
        recyclerView.perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, swipeRight()))
        waitForText("NO")
    }

    @Test
    fun swipe_to_delete_message() {
        adding()
        val recyclerView = onView(withId(R.id.recyclerview))
        recyclerView.perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, swipeRight()))
        waitForText("Delete Message\nFrom $name?")
    }

    @Test
    fun swipe_to_delete_click_yes_name() {
        adding()
        waitForText(name)
        val recyclerView = onView(withId(R.id.recyclerview))
        recyclerView.perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, swipeRight()))
        onView(withText("YES")).perform(click())
        onView(withText(name)).check(doesNotExist())
    }

    @Test
    fun swipe_to_delete_click_no_name() {
        adding()
        waitForText(name)
        val recyclerView = onView(withId(R.id.recyclerview))
        recyclerView.perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, swipeRight()))
        onView(withText("NO")).perform(click())
        waitForText(name)
    }

    @Test
    fun swipe_to_delete_click_yes_back_not_still_there() {
        documentary()
        onView(withId(R.id.fab)).perform(click())
        typeTo(R.id.content, "sixteen chars!!!")
        onView(withText("ADD")).perform(click())
        waitForText(name)
        val recyclerView = onView(withId(R.id.recyclerview))
        recyclerView.perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, swipeRight()))
        onView(withText("YES")).perform(click())
        pressBack()
        onView(withText("Documentary")).perform(click())
        onView(withText(name)).check(doesNotExist())
    }

    @Test
    fun swipe_to_delete_click_no_back_still_there() {
        adding()
        waitForText(name)
        val recyclerView = onView(withId(R.id.recyclerview))
        recyclerView.perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, swipeRight()))
        onView(withText("NO")).perform(click())
        pressBack()
        onView(withText("Rebar & Wire Mesh Install")).perform(click())
        waitForText(name)
    }

    @Test
    fun swipe_to_delete_click_yes_snackbar() {
        adding()
        val recyclerView = onView(withId(R.id.recyclerview))
        recyclerView.perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(0, swipeRight()))
        onView(withText("YES")).perform(click())
        onView(isAssignableFrom(Snackbar.SnackbarLayout::class.java))
            .check(matches(hasDescendant(withText("Message Deleted"))))
    }

    @Test
    fun swipe_second() {
        framing()
        val recyclerView = onView(withId(R.id.recyclerview))
        recyclerView.perform(actionOnItemAtPosition<RecyclerView.ViewHolder>(1, swipeRight()))
        onView(withText("NO")).perform(click())
        waitForText("Rebar & Wire Mesh Install")
    }
}