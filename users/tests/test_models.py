from django.test import TestCase

from users.models import User


class UserTestCase(TestCase):
    email = "test@@test.com"
    user = User(email=email)

    def test_str_should_return_email(self):
        self.assertEqual(str(self.user), self.email)

    def test_get_full_name_should_return_email(self):
        self.assertEqual(self.user.get_full_name(), self.email)

    def test_get_short_name_should_return_email(self):
        self.assertEqual(self.user.get_short_name(), self.email)
