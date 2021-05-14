export default Ember.Controller.extend({
  all_users: [],
  filtered_users: [],
  showFilter: true,
  actions: {
    filter: function () {
      const form_data = new FormData(document.getElementById('search-form'))
      const state = form_data.get('state')
      const grade_year = form_data.get('grade_year')
      const undergraduate = form_data.get('undergraduate')
      const university = form_data.get('university')
      const repeat_year = form_data.get('repeat_year')
      const industry = form_data.get('industry')
      const gender = form_data.get('gender')

      this.set('filtered_users', this.all_users.filter(user => {
        if (state === "" && (grade_year === "" || parseInt(grade_year) === -1) && undergraduate === "" &&
          university === "" && repeat_year === "" && industry === "" && gender === "") {
          return true
        }
        let check_flag_list = [];
        if (state !== "") {
          if (user.State === state) {
            check_flag_list.push(true);
          } else {
            check_flag_list.push(false);
          }
        }
        if (grade_year !== "" && parseInt(grade_year) !== -1) {
          if (parseInt(user.GradeYear) === parseInt(grade_year)) {
            check_flag_list.push(true);
          } else {
            check_flag_list.push(false);
          }
        }
        if (undergraduate !== "") {
          if (user.Undergraduate === undergraduate) {
            check_flag_list.push(true);
          } else {
            check_flag_list.push(false);
          }
        }
        if (university !== "") {
          if (user.University.indexOf(university) > -1) {
            check_flag_list.push(true);
          } else {
            check_flag_list.push(false);
          }
        }
        if (repeat_year !== "") {
          if (user.RepeatYear === repeat_year) {
            check_flag_list.push(true);
          } else {
            check_flag_list.push(false);
          }
        }
        if (industry !== "") {
          if (user.Industry.indexOf(industry) > -1) {
            check_flag_list.push(true);
          } else {
            check_flag_list.push(false);
          }
        }
        if (gender !== "") {
          if (user.Gender === gender) {
            check_flag_list.push(true);
          } else {
            check_flag_list.push(false);
          }
        }
        console.log(check_flag_list)
        console.log(check_flag_list.length > 0)
        console.log(check_flag_list.every(flag => flag))
        return check_flag_list.length > 0 && check_flag_list.every(flag => flag)
      }));
      console.log(...form_data.entries())


      return 'success'
    },
    toggle_filter: function (event) {
      this.set('showFilter', !this.showFilter);
    }
  },
  init: function () {
    this._super();
    const ember_controller = this;
    $.ajax({
      url: "/discourse_user_search_list",
      type: "POST",
      // data: form_data
    })
      .done(function (data, textStatus, jqXHR) {
        console.log(data['data']);
        ember_controller.set('all_users', data['data'])
        ember_controller.set('filtered_users', data['data'])
        return 'success'
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        ember_controller.set('error', 'エラーが発生しました。')
        return 'fail'
      })
  }
});
