import AuthService from '../service/authService'
import PointService from '../service/pointService'
import SessionService from '../service/sessionService'
import ConsultationService from '../service/consultationService'
import EventService from '../service/eventService'
import ShareService from '../service/shareService'
import SurveyService from '~/service/surveyService'

/* URLs */
const authServiceUrl = '/api/account'
const pointServiceUrl = '/api/point'
const sessionServiceUrl = '/api/session-video'
const consultataionServiceUrl = '/api/consulting'
const eventServiceUrl = '/api/events'
const shareServiceUrl = '/api/share'
const surveyServiceUrl = '/api/survey'
const pointSaveServiceUrl = '/api/pgk'

export default (ctx, inject) => {
  const authService = AuthService(ctx.$axios, ctx)(authServiceUrl)
  const pointService = PointService(ctx.$axios)(
    pointServiceUrl,
    pointSaveServiceUrl
  )
  const sessionService = SessionService(
    ctx.$axios,
    ctx.store
  )(sessionServiceUrl)
  const consultationService = ConsultationService(
    ctx.$axios,
    ctx.store
  )(consultataionServiceUrl)
  const eventService = EventService(ctx.$axios, ctx.store)(eventServiceUrl)
  const shareService = ShareService(ctx.$axios, ctx.store)(shareServiceUrl)
  const surveyService = SurveyService(ctx.$axios, ctx.store)(surveyServiceUrl)

  inject('Consult', consultationService)
  inject('Auth', authService)
  inject('Point', pointService)
  inject('Session', sessionService)
  inject('Event', eventService)
  inject('Share', shareService)
  inject('Survey', surveyService)
}
